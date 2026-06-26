# useSession

Returns the session dictionary for the current request. Sessions are backed by signed cookies — no server-side storage.

{% raw %}```python
from nexy import useSession

session = useSession()
```{% endraw %}

---

## Return value

`dict` — the session data from the signed cookie. Returns an empty dict if no session exists.

---

## Example

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
user_id = session.get("user_id")
---
{% if user_id %}
    <p>Logged in as user {{ user_id }}</p>
{% else %}
    <p>Guest</p>
{% endif %}
```{% endraw %}

---

## Writing session data

{% raw %}```python
session = useSession()
session["user_id"] = 123
session["role"] = "admin"
del session["_flash"]
```{% endraw %}

---

## Flash messages pattern

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append("Item saved!")
session["_flashes"] = flashes
```{% endraw %}

---

## Usage notes

- Requires `useSession` config in `nexyconfig.py`
- Session data is signed but **not encrypted**
- No server-side storage — everything is in the cookie