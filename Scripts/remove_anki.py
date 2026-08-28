#!/usr/bin/env python3
"""One-off: remove all in-lecture Anki export slides, buttons and functions."""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def find_balanced_div(html, start):
    """Return end index (exclusive) of the div starting at html[start]."""
    assert html[start:start + 4] == "<div"
    depth = 0
    i = start
    tag = re.compile(r"<div\b|</div\s*>", re.I)
    for m in tag.finditer(html, start):
        if m.group().lower().startswith("<div"):
            depth += 1
        else:
            depth -= 1
            if depth == 0:
                return m.end()
    raise ValueError("unbalanced divs from %d" % start)


def find_balanced_braces(html, start):
    """Return end index (exclusive) of the {...} block whose '{' is the first
    brace at/after start. Naive but fine here (no braces in strings matter)."""
    i = html.index("{", start)
    depth = 0
    while i < len(html):
        c = html[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    raise ValueError("unbalanced braces from %d" % start)


def remove_slide_containing(html, marker):
    """Remove the <div class="slide"...> block that contains marker text."""
    pos = html.find(marker)
    if pos == -1:
        return html, False
    # walk back to the nearest slide div opening
    start = html.rfind('<div class="slide"', 0, pos)
    if start == -1:
        return html, False
    end = find_balanced_div(html, start)
    # eat a following newline for tidiness
    while end < len(html) and html[end] in "\r\n":
        end += 1
    return html[:start] + html[end:], True


def remove_export_fn(html):
    changed = False
    # window.exportToAnki = function() {...}  (optionally with trailing ; )
    for pat in (r"window\.exportToAnki\s*=\s*function\s*\(\)\s*",
                r"function\s+exportToAnki\s*\(\)\s*"):
        m = re.search(pat, html)
        while m:
            end = find_balanced_braces(html, m.end() - 1)
            # swallow trailing semicolon/whitespace-only line + leading comment
            tail = end
            while tail < len(html) and html[tail] in ";":
                tail += 1
            start = m.start()
            # remove a leading comment line like "// Bilingual Anki Export"
            line_start = html.rfind("\n", 0, start) + 1
            prefix = html[line_start:start]
            if prefix.strip() == "":
                cstart = html.rfind("\n", 0, line_start - 1) + 1
                cline = html[cstart:line_start]
                if "anki" in cline.lower() and cline.strip().startswith("//"):
                    start = cstart
                else:
                    start = line_start
            html = html[:start] + html[tail:]
            changed = True
            m = re.search(pat, html)
    return html, changed


def main():
    decks = sorted(glob.glob(os.path.join(ROOT, "Chapter *", "Chapter *.html")))
    if len(decks) != 16:
        print("expected 16 decks, found", len(decks))
        sys.exit(1)
    for path in decks:
        with open(path, encoding="utf-8") as f:
            html = f.read()
        orig = html
        actions = []
        # 1. slides with id="anki"
        while '<div class="slide" id="anki">' in html:
            start = html.index('<div class="slide" id="anki">')
            end = find_balanced_div(html, start)
            while end < len(html) and html[end] in "\r\n":
                end += 1
            html = html[:start] + html[end:]
            actions.append("anki slide")
        # 2. Ch05-style "What is Anki?" slide (no id)
        html, rem = remove_slide_containing(html, "What is Anki?")
        if rem:
            actions.append("what-is-anki slide")
        # 3. export functions
        html, rem = remove_export_fn(html)
        if rem:
            actions.append("exportToAnki fn")
        # 4. dangling spaced-repetition pointer (Ch05)
        old = ("This is called Spaced Repetition. The slide below will give "
               "you a tool that completely automates this process for your "
               "Class 10 Science board prep!")
        new = ("This is called Spaced Repetition. Re-open this deck over the "
               "next days and re-try its quizzes \u2014 that simple habit locks "
               "the chapter into long-term memory!")
        if old in html:
            html = html.replace(old, new)
            actions.append("spaced-rep text")
        if html != orig:
            with open(path, "w", encoding="utf-8") as f:
                f.write(html)
        print(os.path.basename(path), "->", ", ".join(actions) or "no change")


if __name__ == "__main__":
    main()
