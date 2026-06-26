# डायनामिक यूआरएल (रूट पैरामीटर्स)

डायनामिक पैरामीटर वेरिएबल यूआरएल सेगमेंट को कैप्चर करते हैं। नेक्सी `[param]` ब्रैकेट सिंटैक्स का उपयोग करता है।

---

## सिंटेक्स
{% raw %}```bash
routes/
├── blog/
│   ├── index.nexy          →  /blog
│   └── [slug].nexy         →  /blog/{slug}
└── users/
    └── [userId].py         →  /users/{userId}
```{% endraw %}
---

## `.nexy` पेज में

पैरामीटर फ्रंटमैटर गुणों के माध्यम से उपलब्ध है:
{% raw %}```
---
slug: prop[str]
---
<h1>Article: {{ slug }}</h1>
```{% endraw %}
---

## `.py` हैंडलर में
{% raw %}```python
# routes/users/[userId].py
from fastapi import Request

async def get(request: Request, userId: int):
    return {"user_id": userId}
```{% endraw %}
प्रकार स्वचालित रूप से परिवर्तित हो जाते हैं (`int`, `str`, `UUID`, आदि)।

---

## एकाधिक पैरामीटर
{% raw %}```bash
routes/
└── blog/
    └── [year]/[month]/[slug].nexy
```{% endraw %}
{% raw %}```nexy
---
year: prop[int]
month: prop[int]
slug: prop[str]
---
<article>
    {{ year }}-{{ month }}
    {{ slug | replace("-", " ") }}
</article>
```{% endraw %}
---

## कैच-सभी पैरामीटर
{% raw %}```bash
routes/
└── docs/
    └── [...path].nexy      →  /docs/{path+}
```{% endraw %}
{% raw %}```nexy
---
path: prop[list[str]]
---
{{ path | join("/") }}
```{% endraw %}
`path` वेरिएबल **सभी** शेष URL खंडों को एक सूची के रूप में प्राप्त करता है।
{% call Link(href="/docs/fbrouters/query_parameters") %}Next: Query Parameters →{% endcall %}