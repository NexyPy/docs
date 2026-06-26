# Query Parameters

Query parameters are the `?key=value` pairs in a URL. Nexy exposes them via `useSearchParams()` in frontmatter, or `request.query_params` in a handler.

---

## In a `.nexy` page
{% raw %}```nexy
---
from nexy import useSearchParams
params = useSearchParams()
search = params.get("q", "")
page = int(params.get("page", "1"))
---
<h1>Results for: {{ search }}</h1>
<p>Page {{ page }}</p>
```{% endraw %}
The `params` object behaves like a dictionary: `.get(key, default)`, `.keys()`, `.items()`.

---

## In a `.py` handler
{% raw %}```python
# routes/search.py
from fastapi import Request

async def get(request: Request, q: str = "", page: int = 1):
    results = search_database(q, page=page)
    return {"results": results, "page": page}
```{% endraw %}
FastAPI resolves typed query parameters automatically.

---

## Current page params

This page uses `useSearchParams()` in its frontmatter. The current query parameters are:
{% raw %}```json
{{ params | safe }}
```{% endraw %}
---

## Best practices

- Use `useSearchParams()` in `.nexy` components for server-rendered pages
- Use `request.query_params` in `.py` handlers for APIs
- Values are always strings — convert with `int()`, `bool()`, etc.
{% call Link(href="/docs/components") %}Next: Views →{% endcall %}