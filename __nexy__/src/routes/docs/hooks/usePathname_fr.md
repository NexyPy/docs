# usePathname

Returns the current URL path as a string.

{% raw %}```python
from nexy import usePathname

pathname = usePathname()
```{% endraw %}

---

## Return value

`str` — the path component of the current request URL (e.g. `/docs/hooks/usePathname`).

---

## Example

{% raw %}```nexy
---
from nexy import usePathname
path = usePathname()
---
<nav class="breadcrumb">
    {% set segments = path.strip('/').split('/') %}
    {% for seg in segments %}
        <span>/ {{ seg }}</span>
    {% endfor %}
</nav>
```{% endraw %}

---

## Usage notes

- Available in `.nexy` and `.mdx` frontmatter
- Also available in `.py` route handlers via `request.url.path`
- Returns only the path — no query string, no fragment