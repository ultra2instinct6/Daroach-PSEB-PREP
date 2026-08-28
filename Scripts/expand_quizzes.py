#!/usr/bin/env python3
"""Expand the TF / MCQ / Short-Answer banks of every chapter deck.

Reads authored question data from Scripts/quiz_expansion/{chem,bio,phys,env}.py
and appends the new questions to each deck's sub-slider containers, matching
the container's local markup style (sub-progress labels, tf-grid, punjabi
option suffixes, input markup), renumbering "N of M" counters and rewiring
the final next-button chain. Idempotence: refuses to run twice on the same
container (checks the expected pre-expansion count).
"""
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "Scripts", "quiz_expansion"))

FILES = {
    "ch1": "Chapter 01 - Chemical Reactions/Chapter 01 - Chemical Reactions.html",
    "ch2": "Chapter 02 - Acids, Bases and Salts/Chapter 02 - Acids, Bases and Salts.html",
    "ch3": "Chapter 03 - Metals and Non-metals/Chapter 03 - Metals and Non-metals.html",
    "ch4": "Chapter 04 - Carbon Compounds/Chapter 04 - Carbon Compounds.html",
    "ch5": "Chapter 05 - Periodic Table/Chapter 05 - Periodic Table.html",
    "lp:ch6": "Chapter 06 - Life Processes/Chapter 06 - Life Processes.html",
    "cc:ch6": "Chapter 06 - Control and Coordination/Chapter 06 - Control and Coordination.html",
    "ch7": "Chapter 07 - How do Organisms Reproduce/Chapter 07 - How do Organisms Reproduce.html",
    "ch8": "Chapter 08 - Heredity/Chapter 08 - Heredity.html",
    "ch9": "Chapter 09 - Light Reflection and Refraction/Chapter 09 - Light Reflection and Refraction.html",
    "ch10": "Chapter 10 - The Human Eye and Colourful World/Chapter 10 - The Human Eye and Colourful World.html",
    "ch11": "Chapter 11 - Electricity/Chapter 11 - Electricity.html",
    "ch12": "Chapter 12 - Magnetic Effects of Electric Current/Chapter 12 - Magnetic Effects of Electric Current.html",
    "ch13": "Chapter 13 - Our Environment/Chapter 13 - Our Environment.html",
    "ch14": "Chapter 14 - Sources of Energy/Chapter 14 - Sources of Energy.html",
    "ch16": "Chapter 16 - Sustainable Management of Natural Resources/Chapter 16 - Sustainable Management of Natural Resources.html",
}


def file_for_key(key):
    """Map a data key like 'tf-ch5' or 'lp:tf-ch6' to (path, container_id)."""
    prefix = ""
    cid = key
    if ":" in key:
        prefix, cid = key.split(":", 1)
    m = re.search(r"-(ch\d+)$", cid)
    if not m:
        raise ValueError("cannot map key: " + key)
    fkey = (prefix + ":" if prefix else "") + m.group(1)
    return os.path.join(ROOT, FILES[fkey]), cid


def esc_attr(t):
    return (str(t).replace("&", "&amp;").replace('"', "&quot;")
            .replace("<", "&lt;").replace(">", "&gt;"))


def esc_text(t):
    return str(t).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def esc_js(t):
    """Escape a string for use inside single quotes in an onclick attribute."""
    return (str(t).replace("\\", "\\\\").replace("'", "\\'")
            .replace("&", "&amp;").replace('"', "&quot;")
            .replace("<", "&lt;").replace(">", "&gt;"))


def balanced_div(html, start):
    depth = 0
    for m in re.finditer(r"<div\b|</div\s*>", html[start:]):
        depth += 1 if m.group().startswith("<div") else -1
        if depth == 0:
            return start + m.end()
    raise ValueError("unbalanced divs")


class Container(object):
    def __init__(self, html, cid):
        m = re.search(r'<div class="sub-slider-container" id="%s">' % re.escape(cid), html)
        if not m:
            raise ValueError("container not found: " + cid)
        self.start = m.start()
        self.end = balanced_div(html, m.start())
        self.html = html[self.start:self.end]
        self.cid = cid
        self.count = len(re.findall(r'id="%s-s\d+"' % re.escape(cid), self.html))
        # style probes
        pm = re.search(r'<div class="sub-progress">([^<\d]*)(\d+) of (\d+)', self.html)
        self.progress_prefix = pm.group(1) if pm else None
        self.tf_grid = '<div class="tf-grid">' in self.html
        self.tf_punjabi = 'True <span class="punjabi">' in self.html
        nm = re.search(r'class="next-sub-btn" onclick="nextSubSlide\([^"]*"\s*>([^<]+)<', self.html)
        self.next_label = nm.group(1) if nm else "Next Question &rarr;"
        im = re.search(r'<input[^>]*class="sa-input"[^>]*>', self.html)
        self.input_html = im.group(0) if im else '<input type="text" class="sa-input" placeholder="Type your answer here...">'


def progress_div(cont, n, total):
    if cont.progress_prefix is None:
        return ""
    return '<div class="sub-progress">%s%d of %d</div>' % (cont.progress_prefix, n, total)


def question_div(q):
    return ('<div class="question-text">%s<br><span class="punjabi-block">%s</span></div>'
            % (esc_text(q["q"]), esc_text(q["q_pa"])))


def next_btn(cont, next_n):
    return ('<button class="next-sub-btn" onclick="nextSubSlide(\'%s\', %d)">%s</button>'
            % (cont.cid, next_n, cont.next_label))


def explain_attrs(q):
    return (' data-explain="%s" data-explain-pa="%s"'
            % (esc_attr(q["explain"]), esc_attr(q["explain_pa"])))


def build_tf(cont, q, n, total, tail):
    t_ok = "true" if q["answer"] else "false"
    f_ok = "false" if q["answer"] else "true"
    pa_t = ' <span class="punjabi">(\u0a38\u0a39\u0a40)</span>' if cont.tf_punjabi else ""
    pa_f = ' <span class="punjabi">(\u0a17\u0a32\u0a24)</span>' if cont.tf_punjabi else ""
    btns = ('<button class="option-btn" onclick="checkAnswer(this, %s, false)">True%s</button>'
            '<button class="option-btn" onclick="checkAnswer(this, %s, false)">False%s</button>'
            % (t_ok, pa_t, f_ok, pa_f))
    if cont.tf_grid:
        btns = '<div class="tf-grid">' + btns + "</div>"
    return ('<div class="sub-slide" id="%s-s%d"%s>%s%s%s<div class="feedback"></div>%s</div>'
            % (cont.cid, n, explain_attrs(q), progress_div(cont, n, total),
               question_div(q), btns, tail))


LETTERS = ["A. ", "B. ", "C. ", "D. "]


def build_mcq(cont, q, n, total, tail):
    btns = ""
    for i, opt in enumerate(q["options"]):
        correct = i == q["correct"]
        btns += ('<button class="option-btn"%s onclick="checkAnswer(this, %s, true)">%s%s</button>'
                 % (' data-correct="true"' if correct else "",
                    "true" if correct else "false", LETTERS[i], esc_text(opt)))
    return ('<div class="sub-slide" id="%s-s%d"%s>%s%s%s<div class="feedback"></div>%s</div>'
            % (cont.cid, n, explain_attrs(q), progress_div(cont, n, total),
               question_div(q), btns, tail))


def build_sa(cont, q, n, total, tail):
    submit = ('<button class="sa-submit-btn" onclick="checkSA(this, \'%s\', \'%s\')">Check Answer</button>'
              % (esc_js(q["a"]), esc_js(q.get("a_pa", ""))))
    attrs = (' data-q="%s" data-a="%s" data-pa="%s"'
             % (esc_attr(q["q"]), esc_attr(q["a"]), esc_attr(q.get("a_pa", ""))))
    return ('<div class="sub-slide short-answer" id="%s-s%d"%s%s>%s%s%s%s<div class="feedback"></div>%s</div>'
            % (cont.cid, n, attrs, explain_attrs(q), progress_div(cont, n, total),
               question_div(q), cont.input_html, submit, tail))


def expand_container(html, cid, questions, expected_old):
    cont = Container(html, cid)
    if cont.count != expected_old:
        raise ValueError("%s: expected %d existing questions, found %d (already expanded?)"
                         % (cid, expected_old, cont.count))
    total = cont.count + len(questions)
    body = cont.html

    # 1. locate last existing sub-slide and its exit button
    lm = re.search(r'<div class="sub-slide[^"]*" id="%s-s%d"' % (re.escape(cid), cont.count), body)
    if not lm:
        raise ValueError(cid + ": last sub-slide not found")
    lend = balanced_div(body, lm.start())
    last_html = body[lm.start():lend]
    em = re.search(r'<button class="next-sub-btn"[^>]*>.*?</button>(?=</div>$)', last_html, re.S)
    if not em:
        raise ValueError(cid + ": exit button not found")
    exit_btn = em.group(0)
    # dangling label from the removed Anki slide
    exit_btn = exit_btn.replace("Get Your Flashcards &rarr;", "Finish &rarr;")
    # 2. rewire old last slide to chain into first new question
    new_last = last_html[:em.start()] + next_btn(cont, cont.count + 1) + last_html[em.start() + len(em.group(0)):]
    body = body[:lm.start()] + new_last + body[lend:]

    # 3. build new sub-slides
    kind = "tf" if cid.startswith("tf-") else ("mcq" if cid.startswith("mcq-") else "sa")
    build = {"tf": build_tf, "mcq": build_mcq, "sa": build_sa}[kind]
    add = ""
    for i, q in enumerate(questions):
        n = cont.count + 1 + i
        last = i == len(questions) - 1
        tail = exit_btn if last else next_btn(cont, n + 1)
        add += build(cont, q, n, total, tail)

    # 4. insert before container's closing tag
    assert body.endswith("</div>")
    body = body[:-6] + add + "</div>"

    # 5. renumber all "N of M" totals
    body = re.sub(r'(class="sub-progress">[^<]*?)(\d+) of (\d+)',
                  lambda m: m.group(1) + m.group(2) + " of " + str(total), body)

    return html[:cont.start] + body + html[cont.end:]


EXPECTED = {
    "tf-ch1": 13, "sib-ch1": 13, "mcq-ch1": 12,
    "tf-ch2": 13, "sib-ch2": 12, "mcq-ch2": 12,
    "tf-ch3": 14, "sib-ch3": 12, "mcq-ch3": 12,
    "tf-ch4": 14, "sib-ch4": 11, "mcq-ch4": 12,
    "tf-ch5": 13, "sib-ch5": 9, "mcq-ch5": 12,
    "lp:tf-ch6": 8, "lp:sib-ch6": 8, "lp:mcq-ch6": 5,
    "cc:tf-ch6": 8, "cc:sib-ch6": 8, "cc:mcq-ch6": 8,
    "tf-ch7": 8, "sib-ch7": 8, "mcq-ch7": 8,
    "tf-ch8": 8, "sib-ch8": 8, "mcq-ch8": 8,
    "tf-ch9": 8, "sib-ch9": 8, "mcq-ch9": 8,
    "tf-ch10": 8, "sib-ch10": 8, "mcq-ch10": 8,
    "tf-ch11": 8, "sib-ch11": 8, "mcq-ch11": 8,
    "tf-ch12": 8, "sib-ch12": 8, "mcq-ch12": 8,
    "tf-ch13": 8, "sib-ch13": 8, "mcq-ch13": 8,
    "tf-ch14": 4, "sib-ch14": 4, "mcq-ch14": 3,
    "tf-ch16": 4, "sib-ch16": 4, "mcq-ch16": 3,
}


def validate(key, questions):
    kind = "tf" if key.split(":")[-1].startswith("tf-") else (
        "mcq" if key.split(":")[-1].startswith("mcq-") else "sa")
    for i, q in enumerate(questions):
        where = "%s[%d]" % (key, i)
        for f in ("q", "q_pa", "explain", "explain_pa"):
            assert q.get(f), where + " missing " + f
        if kind == "tf":
            assert isinstance(q.get("answer"), bool), where + " answer must be bool"
        elif kind == "mcq":
            assert isinstance(q.get("options"), list) and len(q["options"]) == 3, where + " needs 3 options"
            assert q.get("correct") in (0, 1, 2), where + " bad correct index"
        else:
            assert q.get("a"), where + " missing a"


def main():
    data = {}
    for mod in ("chem", "bio", "phys", "env"):
        m = __import__(mod)
        for k, v in m.QUESTIONS.items():
            assert k not in data, "duplicate key " + k
            data[k] = v

    missing = set(EXPECTED) - set(data)
    extra = set(data) - set(EXPECTED)
    assert not missing, "missing keys: %s" % sorted(missing)
    assert not extra, "unexpected keys: %s" % sorted(extra)
    for k, v in data.items():
        validate(k, v)

    by_file = {}
    for key, questions in data.items():
        path, cid = file_for_key(key)
        by_file.setdefault(path, []).append((key, cid, questions))

    for path, jobs in sorted(by_file.items()):
        html = io.open(path, encoding="utf-8").read()
        for key, cid, questions in jobs:
            html = expand_container(html, cid, questions, EXPECTED[key])
            print("%-14s +%2d -> %2d  %s" % (cid, len(questions),
                  EXPECTED[key] + len(questions), os.path.basename(path)[:44]))
        io.open(path, "w", encoding="utf-8").write(html)
    print("done")


if __name__ == "__main__":
    main()
