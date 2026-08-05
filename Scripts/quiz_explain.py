#!/usr/bin/env python3
"""Quiz explanation tooling for PSEB decks.

Two modes:
  extract  <chapter.html>            -> prints every quiz sub-slide (id, type,
                                        question EN, correct answer) as JSON so
                                        explanations can be authored accurately.
  apply    <chapter.html> <map.json> -> inserts data-explain / data-explain-pa
                                        onto each <div class="sub-slide" id="..">
                                        from the JSON map. Idempotent: existing
                                        attributes for a listed id are replaced.

The JSON map format (apply):
  { "mcq-ch1-s1": {"en": "English why...", "pa": "ਪੰਜਾਬੀ ..."}, ... }
"""
import sys, re, json, html as htmlmod


def _clean(s):
    s = re.sub(r"<[^>]+>", " ", s)
    s = htmlmod.unescape(s)
    return re.sub(r"\s+", " ", s).strip()


def extract(path):
    doc = open(path, encoding="utf-8").read()
    out = []
    # each sub-slide: <div class="sub-slide ..." id="mcq-chN-sK" ...> ... up to next sub-slide or container close
    for m in re.finditer(r'<div class="sub-slide[^"]*"\s+id="([^"]+)"([^>]*)>', doc):
        sid = m.group(1)
        start = m.end()
        # slice until the next sub-slide div or a reasonable window
        nxt = doc.find('<div class="sub-slide', start)
        seg = doc[start: nxt if nxt != -1 else start + 4000]
        # question text (English = text before first punjabi span/block)
        qm = re.search(r'<div class="question-text">(.*?)</div>', seg, re.S)
        qen = ""
        if qm:
            raw = qm.group(1)
            raw = re.split(r'<span class="punjabi', raw)[0]
            qen = _clean(raw)
        kind = "mcq" if sid.startswith("mcq") else ("tf" if sid.startswith("tf") else "sa")
        ans = ""
        if kind == "mcq":
            cm = re.search(r'data-correct="true"[^>]*>(.*?)</button>', seg, re.S)
            if cm:
                ans = _clean(cm.group(1))
        elif kind == "tf":
            tm = re.search(r'checkAnswer\(this,\s*true\s*,\s*false\)[^>]*>(.*?)</button>', seg, re.S)
            if tm:
                ans = _clean(tm.group(1))
        else:  # sa
            sm = re.search(r"checkSA\(this,\s*'([^']*)'", seg)
            if sm:
                ans = sm.group(1)
        out.append({"id": sid, "type": kind, "q": qen, "answer": ans})
    print(json.dumps(out, ensure_ascii=False, indent=2))


def _esc_attr(s):
    return s.replace("&", "&amp;").replace('"', "&quot;")


def apply(path, mappath):
    doc = open(path, encoding="utf-8").read()
    mapping = json.load(open(mappath, encoding="utf-8"))
    changed = 0
    for sid, val in mapping.items():
        en = (val.get("en") or "").strip()
        pa = (val.get("pa") or "").strip()
        # locate the opening tag for this id
        tagre = re.compile(r'(<div class="sub-slide[^"]*"\s+id="' + re.escape(sid) + r'")([^>]*)(>)')
        m = tagre.search(doc)
        if not m:
            print("WARN: id not found:", sid, file=sys.stderr)
            continue
        attrs = m.group(2)
        # strip any existing explain attrs
        attrs = re.sub(r'\s+data-explain(?:-pa)?="[^"]*"', "", attrs)
        add = ""
        if en:
            add += ' data-explain="' + _esc_attr(en) + '"'
        if pa:
            add += ' data-explain-pa="' + _esc_attr(pa) + '"'
        newtag = m.group(1) + attrs + add + m.group(3)
        doc = doc[:m.start()] + newtag + doc[m.end():]
        changed += 1
    open(path, "w", encoding="utf-8").write(doc)
    print("applied", changed, "explanations to", path)


if __name__ == "__main__":
    if len(sys.argv) < 3 or sys.argv[1] not in ("extract", "apply"):
        print(__doc__)
        sys.exit(1)
    if sys.argv[1] == "extract":
        extract(sys.argv[2])
    else:
        apply(sys.argv[2], sys.argv[3])
