# useSearchParams

Returns the current URL query parameters as a dictionary.

{% raw %}```python
from nexy import useSearchParams

params = useSearchParams()
```{% endraw %}

---

## Return value

`dict` — query parameters from the request URL (e.g. `{"q": "nexy", "page": "2"}`).

---

## Example

{% raw %}```nexy
---
from nexy import useSearchParams
params = useSearchParams()
search = params.get("q", "")
page = int(params.get("page", "1"))
---
<h1>Search: {{ search }}</h1>
<p>Page {{ page }}</p>
```{% endraw %}

---

## Methods

The returned dict supports standard dictionary operations: `.get(key, default)`, `.keys()`, `.items()`.

---

## Usage notes

- All values are strings — convert with `int()`, `bool()`, etc.
- For API handlers, use FastAPI's native parameter injection instead