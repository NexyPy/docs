# Cookies und Header

Lesen Sie HTTP-Cookies und Header mit den FastAPI-Parametern `Cookie` und `Header`.

---

## Cookie-Parameter
{% raw %}```python
---
from fastapi import Cookie

def GET(session_id: str | None = Cookie(None)):
    return {"session_id": session_id}
---
```{% endraw %}
{% raw %}```python
from fastapi import Cookie
from nexy.decorators import Controller

"@Controller("/profile")
class ProfileController:
    def GET(self, session_id: str | None = Cookie(None)):
        return {"session_id": session_id}
```{% endraw %}
## Mehrere Cookies
{% raw %}```python
---
from fastapi import Cookie

def GET(
    session_id: str | None = Cookie(None),
    theme: str = Cookie("light"),
):
    return {"session": session_id, "theme": theme}
---
```{% endraw %}
{% raw %}```python
from fastapi import Cookie
from nexy.decorators import Controller

"@Controller("/settings")
class SettingsController:
    def GET(self, session_id: str | None = Cookie(None), theme: str = Cookie("light")):
        return {"session": session_id, "theme": theme}
```{% endraw %}
## Header-Parameter
{% raw %}```python
---
from fastapi import Header

def GET(user_agent: str | None = Header(None)):
    return {"ua": user_agent}
---
```{% endraw %}
{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/info")
class InfoController:
    def GET(self, user_agent: str | None = Header(None)):
        return {"ua": user_agent}
```{% endraw %}
## Benutzerdefinierter Header-Alias

Header-Namen werden standardmäßig in Kleinbuchstaben mit Bindestrichen als Unterstrichen geschrieben. Verwenden Sie `alias` für benutzerdefinierte Header-Namen:
{% raw %}```python
---
from fastapi import Header

def GET(x_token: str = Header(alias="X-Token")):
    return {"token": x_token}
---
```{% endraw %}
{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/secure")
class SecureController:
    def GET(self, x_token: str = Header(alias="X-Token")):
        return {"token": x_token}
```{% endraw %}
## Cookies in Vorlagen lesen

Verwenden Sie in `.nexy`-Vorlagen den Hook `useCookies()`:
{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}
## Siehe auch

- [useCookies hook](/docs/hooks/useCookies) – zum Lesen von Cookies in Vorlagen
- [Session config](/docs/config/session) – Einrichtung der Sitzungs-Middleware