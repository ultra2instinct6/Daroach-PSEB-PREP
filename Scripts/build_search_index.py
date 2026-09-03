#!/usr/bin/env python3
"""Build the bilingual (Gurmukhi/English) syllabus search index.

Walks every chapter deck listed in assets/chapters.js, extracts one entry per
slide (slide number, English heading, Gurmukhi heading) and writes
assets/search-index.js — a plain `window.PSEB_SEARCH_INDEX = [...]` script so
it loads over the file:// scheme like the rest of assets/.

Run from the repository root:

    python3 "Scripts/build_search_index.py"
"""

from __future__ import annotations

import json
import re
import unicodedata
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHAPTERS_JS = ROOT / "assets" / "chapters.js"
GLOSSARY_JS = ROOT / "assets" / "glossary.js"
OUT = ROOT / "assets" / "search-index.js"

GURMUKHI = re.compile(r"[\u0A00-\u0A7F]")
TAG = re.compile(r"<[^>]+>")
WS = re.compile(r"\s+")


def load_chapters() -> list[dict]:
    """Parse the chapter catalog out of the JS single source of truth."""
    src = CHAPTERS_JS.read_text(encoding="utf-8")
    body = src.split("window.PSEB_CHAPTERS =", 1)[1].split("];", 1)[0] + "]"
    entries = []
    for row in re.finditer(r"\{([^{}]*)\}", body):
        raw = row.group(1)
        item = {}
        for key in ("n", "slides"):
            m = re.search(rf"\b{key}\s*:\s*(\d+)", raw)
            if m:
                item[key] = int(m.group(1))
        for key in ("title", "file", "subject"):
            m = re.search(rf'\b{key}\s*:\s*"([^"]*)"', raw)
            if m:
                item[key] = m.group(1)
        if "n" in item and "file" in item:
            entries.append(item)
    return entries


def strip_tags(fragment: str) -> str:
    return WS.sub(" ", unescape(TAG.sub(" ", fragment))).strip()


def split_slides(html: str) -> list[str]:
    """Split a deck into top-level `.slide` blocks by brace-free tag counting.

    Nested `.sub-slide` blocks (quiz steps) must not be treated as slides —
    the deck's `#slide=N` deep link addresses top-level slides only.
    """
    slides: list[str] = []
    end_of_previous = 0
    for m in re.finditer(r"<div\b[^>]*>", html):
        if m.start() < end_of_previous:
            continue  # nested inside the slide we already captured
        cls = re.search(r'class\s*=\s*"([^"]*)"', m.group(0))
        if not cls or "slide" not in cls.group(1).split():
            continue
        start = m.start()
        depth = 0
        pos = len(html)
        for tok in re.finditer(r"<(/?)div\b[^>]*?(/?)>", html[start:]):
            if tok.group(2) == "/":
                continue
            depth += -1 if tok.group(1) else 1
            if depth == 0:
                pos = start + tok.end()
                break
        slides.append(html[start:pos])
        end_of_previous = pos
    return slides


def headings(slide: str) -> tuple[str, str]:
    """Return (english_heading, gurmukhi_heading) for one slide."""
    en_parts: list[str] = []
    pa_parts: list[str] = []

    for m in re.finditer(r"<(h1|h2|h3)\b[^>]*>(.*?)</\1>", slide, re.S | re.I):
        inner = m.group(2)
        # Gurmukhi usually lives in a nested .punjabi / lang="pa" span.
        for sub in re.finditer(
            r'<span\b[^>]*(?:class="[^"]*\bpunjabi\b[^"]*"|lang="pa")[^>]*>(.*?)</span>',
            inner,
            re.S | re.I,
        ):
            text = strip_tags(sub.group(1))
            if text:
                pa_parts.append(text)
        rest = strip_tags(re.sub(r"<span\b[^>]*>.*?</span>", " ", inner, flags=re.S | re.I))
        if not rest:
            rest = strip_tags(inner)
        if rest:
            (pa_parts if GURMUKHI.search(rest) else en_parts).append(rest)

    if not pa_parts:
        # Fall back to the first standalone Punjabi block on the slide.
        for m in re.finditer(
            r'<(?:span|p|div|h4)\b[^>]*(?:class="[^"]*\bpunjabi(?:-block)?\b[^"]*"|lang="pa")[^>]*>(.*?)</(?:span|p|div|h4)>',
            slide,
            re.S | re.I,
        ):
            text = strip_tags(m.group(1))
            if text and GURMUKHI.search(text):
                pa_parts.append(text)
                break

    def join(parts: list[str], limit: int) -> str:
        seen: list[str] = []
        for p in parts:
            p = p.strip(" ·-—|")
            if p and p not in seen:
                seen.append(p)
        out = " · ".join(seen)
        return out[:limit].rstrip(" ·")

    return join(en_parts, 90), join(pa_parts, 90)


def load_glossary() -> dict[str, list[str]]:
    """canonical English term -> every matchable spelling (canonical + alts)."""
    src = GLOSSARY_JS.read_text(encoding="utf-8")
    out: dict[str, list[str]] = {}
    for m in re.finditer(r'\{\s*en:\s*"([^"]+)"(.*?)\}', src, re.S):
        canonical = m.group(1)
        spellings = [canonical]
        alts = re.search(r"alt:\s*\[([^\]]*)\]", m.group(2))
        if alts:
            spellings += re.findall(r'"([^"]+)"', alts.group(1))
        out[canonical] = spellings
    return out


def build_term_slides(
    glossary: dict[str, list[str]], slide_text: dict[int, list[str]]
) -> dict[str, list[dict]]:
    """For each glossary term, the first slide in each chapter that mentions it."""
    patterns = {
        canonical: re.compile(
            r"\b(?:" + "|".join(re.escape(s).replace(r"\ ", r"\s+") for s in spellings) + r")\b",
            re.I,
        )
        for canonical, spellings in glossary.items()
    }
    hits: dict[str, list[dict]] = {}
    for chapter in sorted(slide_text):
        for slide_i, text in enumerate(slide_text[chapter]):
            if not text:
                continue
            for canonical, pattern in patterns.items():
                found = hits.setdefault(canonical, [])
                if any(h["c"] == chapter for h in found):
                    continue
                if pattern.search(text):
                    found.append({"c": chapter, "s": slide_i})
    return {k: v for k, v in hits.items() if v}


def build() -> tuple[list[dict], dict[int, list[str]]]:
    index: list[dict] = []
    slide_text: dict[int, list[str]] = {}
    for ch in load_chapters():
        path = ROOT / ch["file"]
        if not path.exists():
            print(f"  ! missing {ch['file']}")
            continue
        html = path.read_text(encoding="utf-8", errors="replace")
        slides = split_slides(html)
        slide_text[ch["n"]] = [strip_tags(s) for s in slides]
        kept = 0
        for i, slide in enumerate(slides):
            en, pa = headings(slide)
            if not en and not pa:
                continue
            entry = {"c": ch["n"], "s": i}
            if en:
                entry["en"] = unicodedata.normalize("NFC", en)
            if pa:
                entry["pa"] = unicodedata.normalize("NFC", pa)
            index.append(entry)
            kept += 1
        print(f"  Ch {ch['n']:>2}: {kept:>3} indexed slides of {len(slides)}")
    return index, slide_text


def main() -> None:
    print("Building bilingual search index…")
    index, slide_text = build()
    glossary = load_glossary()
    term_slides = build_term_slides(glossary, slide_text)

    slides_payload = json.dumps(index, ensure_ascii=False, separators=(",", ":"))
    terms_payload = json.dumps(term_slides, ensure_ascii=False, separators=(",", ":"))

    OUT.write_text(
        "/* GENERATED FILE — do not edit by hand.\n"
        '   Rebuild with:  python3 "Scripts/build_search_index.py"\n\n'
        "   Slide-level bilingual search index for the 16 PSEB Class 10 Science\n"
        "   chapters, consumed by index.html together with assets/glossary.js\n"
        "   for cross-language (Gurmukhi <-> English) matching.\n\n"
        "   PSEB_SEARCH_INDEX  [{ c: chapter no, s: 0-based slide index,\n"
        "                         en: English heading, pa: Gurmukhi heading }]\n"
        "   PSEB_TERM_SLIDES   { \"English Term\": [{ c, s }] } — first slide in\n"
        "                      each chapter that actually mentions the term, so a\n"
        "                      term hit can deep-link straight to it. */\n"
        "window.PSEB_SEARCH_INDEX = " + slides_payload + ";\n"
        "window.PSEB_TERM_SLIDES = " + terms_payload + ";\n",
        encoding="utf-8",
    )
    print(
        f"Wrote {OUT.relative_to(ROOT)} — {len(index)} slide entries, "
        f"{len(term_slides)} located glossary terms."
    )


if __name__ == "__main__":
    main()
