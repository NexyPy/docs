# Session

Configure session middleware for signed-cookie sessions — no server-side storage required.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useSession = {
        "secret_key": "your-secret-key",
        "max_age": 3600,
        "same_site": "lax",
        "https_only": False,
    }
```{% endraw %}

Uses Starlette's `SessionMiddleware` under the hood.

---

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `secret_key` | `str` | required | Secret key for signing session cookies |
| `max_age` | `int` | `1209600` (14 days) | Session cookie max age in seconds |
| `same_site` | `str` | `"lax"` | SameSite policy (`"lax"`, `"strict"`, `"none"`) |
| `https_only` | `bool` | `False` | Only send cookie over HTTPS |

---

## Usage

{% raw %}```python
from nexy import useSession

session = useSession()
session["user_id"] = 123
session["role"] = "admin"
```{% endraw %}

Session behaves like a dictionary — assign, read, delete:

{% raw %}```python
session = useSession()
user_id = session.get("user_id")
del session["user_id"]
```{% endraw %}

---

## Flash messages pattern

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append({"type": "success", "text": "Saved!"})
session["_flashes"] = flashes
```{% endraw %}

Then read and clear in your template:

{% raw %}```python
session = useSession()
flashes = session.pop("_flashes", [])
```{% endraw %}

---

## Security notes

- Session data is signed but **not encrypted** — do not store sensitive data
- Rotate `secret_key` periodically in production
- Use `https_only=True` in production