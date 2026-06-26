# Dynamische URLs (Routenparameter)

Dynamische Parameter erfassen variable URL-Segmente. Nexy verwendet die Klammersyntax `[param]`.

---

## Syntax
{% raw %}```bash
routes/
├── blog/
│   ├── index.nexy          →  /blog
│   └── [slug].nexy         →  /blog/{slug}
└── users/
    └── [userId].py         →  /users/{userId}
```{% endraw %}
---

## Auf einer `.nexy` Seite

Der Parameter ist über die Frontmatter-Eigenschaften verfügbar:
{% raw %}```
---
slug: prop[str]
---
<h1>Article: {{ slug }}</h1>
```{% endraw %}
---

## In einem `.py`-Handler
{% raw %}```python
# routes/users/[userId].py
from fastapi import Request

async def get(request: Request, userId: int):
    return {"user_id": userId}
```{% endraw %}
Typen werden automatisch konvertiert (`int`, `str`, `UUID` usw.).

---

## Mehrere Parameter
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

## Catch-all-Parameter
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
Die Variable `path` empfängt **alle** verbleibenden URL-Segmente als Liste.
{% call Link(href="/docs/fbrouters/query_parameters") %}Next: Query Parameters →{% endcall %}