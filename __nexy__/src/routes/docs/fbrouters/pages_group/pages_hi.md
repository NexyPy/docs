# पेज

पेज एक रूट है जो HTML लौटाता है। नेक्सी में, पेज `.nexy` या `.mdx` फ़ाइलें `src/routes/` के अंतर्गत हैं।

> पेज **रूट हैंडलर** (`.py` फ़ाइलें) से भिन्न होते हैं जो JSON या कच्चा डेटा लौटाते हैं।

---

## एक पेज बनाना

`.nexy` या `.mdx` फ़ाइल को `src/routes/` में रखें:
{% raw %}```bash
src/
└── routes/
    └── index.nexy       →  /
```{% endraw %}
{% raw %}```html
<!-- index.nexy -->
<h1>Hello Nexy!</h1>
```{% endraw %}
किसी मार्ग पंजीकरण की आवश्यकता नहीं है - फ़ाइल **मार्ग** है।

---

## `.nexy` में पेज

एक `.nexy` फ़ाइल में पायथन फ्रंटमैटर और एक HTML टेम्पलेट हो सकता है:
{% raw %}```
---
items: prop[list] = []
---
<ul>
{% for item in items %}
    {{ item }}
{% endfor %}
</ul>
```{% endraw %}
---

## `.mdx` में पेज

`.mdx` फ़ाइलें मार्कडाउन को नेक्सी घटकों के साथ जोड़ती हैं:
{% raw %}```mdx
---
from "@components/link.nexy" import Link
---

# My Article

<Link href="/docs">Back to docs</Link>
```{% endraw %}
यह पृष्ठ जो आप पढ़ रहे हैं वह स्वयं एक `.mdx` फ़ाइल है - TOC, साइडबार और ब्रेडक्रंब को लेआउट द्वारा नियंत्रित किया जाता है।

---

## नॉन-रूटेबल विशेष फ़ाइलें

`routes/` के अंदर कुछ फ़ाइलें रूट नहीं बनातीं:

| फ़ाइल | भूमिका |
|---|---|
| `__init__.py` | पायथन पैकेज मार्कर |
| `layout.nexy` | साझा लेआउट रैपर |
| `dependencies.py` | साझा निर्भरताएँ |
{% call Link(href="/docs/fbrouters/layouts") %}Next: Layouts →{% endcall %}