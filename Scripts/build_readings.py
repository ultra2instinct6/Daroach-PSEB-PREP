# -*- coding: utf-8 -*-
"""Rebuild the reading slides in every PSEB deck.

For each chapter:
  * remove all existing reading slides (old `reading-box` / `reading-pane`
    story-mode slides, and any previously generated `bi-reading` slides),
  * insert 3 fresh Punjabi-first bilingual reading slides as a "Reading Corner"
    immediately after the cover (first) slide.

Slide boundaries are found by balanced <div> scanning so nested markup and the
trailing <script> are never disturbed. Run from anywhere; paths are repo-relative.
"""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import readings_data as data

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLIDE_START = re.compile(r'<div class="slide(?:"| )')
TAG = re.compile(r'<div\b|</div>')


def slide_end(html, start):
    """Return index just past the balanced </div> that closes the slide at `start`."""
    depth = 0
    for m in TAG.finditer(html, start):
        depth += 1 if m.group() == '<div' else -1
        if depth == 0:
            return m.end()
    raise ValueError("unbalanced slide starting at %d" % start)


def slide_spans(html):
    spans, i = [], 0
    while True:
        m = SLIDE_START.search(html, i)
        if not m:
            break
        s = m.start()
        e = slide_end(html, s)
        spans.append((s, e))
        i = e
    return spans


def is_reading(fragment):
    return ('reading-box' in fragment or 'reading-pane' in fragment
            or 'bi-reading' in fragment or 'class="reading-text"' in fragment)


def reading_slide(pa_title, en_title, pa_text, en_text):
    return (
        '<div class="slide"><div class="content-box">\n'
        '    <h2>Reading Corner <span class="bi-tag">\u0a2a\u0a5c\u0a4d\u0a39\u0a4b \u00b7 Story Mode</span></h2>\n'
        '    <div class="bi-reading">\n'
        '        <div class="bi-read-top">\n'
        '            <h3 class="bi-title">' + pa_title +
        '<span class="bi-title-en">' + en_title + '</span></h3>\n'
        '            <div class="bi-actions">\n'
        '                <button class="bi-btn bi-toggle" aria-pressed="false" title="Switch language">English</button>\n'
        '                <button class="bi-btn bi-listen" title="Listen">\U0001f50a \u0a38\u0a41\u0a23\u0a4b</button>\n'
        '                <button class="bi-btn bi-stop" title="Stop">\u23f9</button>\n'
        '            </div>\n'
        '        </div>\n'
        '        <p class="bi-pa" lang="pa">' + pa_text + '</p>\n'
        '        <p class="bi-en" lang="en" hidden>' + en_text + '</p>\n'
        '    </div>\n'
        '</div></div>')


def rebuild(chapter_key, path):
    with open(path, encoding='utf-8') as fh:
        html = fh.read()
    spans = slide_spans(html)
    if not spans:
        raise ValueError("no slides found in %s" % path)

    prefix = html[:spans[0][0]]
    suffix = html[spans[-1][1]:]

    slides = [html[s:e] for s, e in spans]
    cover = slides[0]
    rest = [frag for frag in slides[1:] if not is_reading(frag)]
    removed = (len(slides) - 1) - len(rest)

    new_reads = [reading_slide(*r) for r in data.READINGS[chapter_key]]

    body = cover + '\n' + '\n'.join(new_reads) + '\n' + '\n'.join(rest)
    out = prefix + body + '\n' + suffix.lstrip('\n')

    with open(path, 'w', encoding='utf-8') as fh:
        fh.write(out)
    return removed, len(new_reads), len(slide_spans(out))


def main():
    only = set(sys.argv[1:])
    for key, rel in data.FILES.items():
        if only and key not in only:
            continue
        path = os.path.join(BASE, rel)
        removed, added, total = rebuild(key, path)
        print("ch %-4s removed %d old, added %d, total slides now %d  (%s)"
              % (key, removed, added, total, os.path.basename(rel)))


if __name__ == '__main__':
    main()
