# Dynamic URLs (Route Parameters)

Dynamic parameters capture variable URL segments. Nexy uses the `[param]` bracket syntax.

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

## In a `.nexy` page

The parameter is available via frontmatter properties:
{% raw %}```
---
slug: prop[str]
---
<h1>Article: {{ slug }}</h1>
```{% endraw %}
---

## In a `.py` handler
{% raw %}```python
# routes/users/[userId].py
from fastapi import Request

async def get(request: Request, userId: int):
    return {"user_id": userId}
```{% endraw %}
Types are converted automatically (`int`, `str`, `UUID`, etc.).

---

## Multiple parameters
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

## Catch-all parameters
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
The `path` variable receives **all** remaining URL segments as a list.
{% call Link(href="/docs/fbrouters/query_parameters") %}Next: Query Parameters →{% endcall %}