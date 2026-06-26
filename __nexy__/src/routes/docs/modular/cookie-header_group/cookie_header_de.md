# Cookies und Header (modular)

Lesen Sie HTTP-Cookies und -Header mithilfe der FastAPIs `Cookie` und `Header` in Controllern.

## Cookie-Parameter

{% raw %}```python
from nexy.decorators import Controller
from fastapi import Cookie

"@Controller("/profile")
class ProfileController:
    def GET(self, session_id: str | None = Cookie(None)):
        return {"session_id": session_id}
```{% endraw %}

## Mehrere Cookies

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
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/info")
class InfoController:
    def GET(self, user_agent: str | None = Header(None)):
        return {"ua": user_agent}
```{% endraw %}

## Benutzerdefinierter Header-Alias

{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/secure")
class SecureController:
    def GET(self, x_token: str = Header(alias="X-Token")):
        return {"token": x_token}
```{% endraw %}

Header-Namen werden standardmäßig in Kleinbuchstaben mit Bindestrichen als Unterstrichen geschrieben. Verwenden Sie `alias` für benutzerdefinierte Namen.

## Cookies in Vorlagen lesen

Verwenden Sie in `.nexy`-Vorlagen den Hook `useCookies()`:

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}

---

Siehe auch: [useCookies hook](/docs/hooks/useCookies), [Session config](/docs/config/session)