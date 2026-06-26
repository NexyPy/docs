# useQuery

Returns the dynamic route parameters (path params) from the current URL.

{% raw %}```python
from nexy import useQuery

query = useQuery()
```{% endraw %}

---

## Return value

`dict` — path parameters extracted from the URL (e.g. `{"slug": "hello-world"}` for a `[slug]` route).

---

## Example

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<h1>Article: {{ params.slug }}</h1>
```{% endraw %}

---

## With multiple parameters

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<article>
    {{ params.title }}
    <p>Year: {{ params.year }}, Month: {{ params.month }}</p>
</article>
```{% endraw %}

---

## Usage notes

- Values are strings by default — FastAPI type conversion applies in `.py` handlers
- Equivalent to `request.path_params` in FastAPI