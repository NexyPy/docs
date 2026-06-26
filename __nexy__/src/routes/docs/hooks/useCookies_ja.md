# useCookies

Returns the cookies from the current request as a dictionary.

{% raw %}```python
from nexy import useCookies

cookies = useCookies()
```{% endraw %}

---

## Return value

`dict` — all cookies sent with the request.

---

## Example

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
locale = cookies.get("nexy-locale", "en")
---
<html lang="{{ locale }}">
```{% endraw %}

---

## Usage notes

- Read-only — use `useSession` for setting cookies
- Cookie values are strings
- Equivalent to `request.cookies` in FastAPI