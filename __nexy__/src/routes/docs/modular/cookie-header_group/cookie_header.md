# Cookies & Headers (Modular)

Read HTTP cookies and headers using FastAPI's `Cookie` and `Header` in controllers.

## Cookie parameter

{% raw %}```python
from nexy.decorators import Controller
from fastapi import Cookie

"@Controller("/profile")
class ProfileController:
    def GET(self, session_id: str | None = Cookie(None)):
        return {"session_id": session_id}
```{% endraw %}

## Multiple cookies

{% raw %}```python
from fastapi import Cookie
from nexy.decorators import Controller

"@Controller("/settings")
class SettingsController:
    def GET(self, session_id: str | None = Cookie(None), theme: str = Cookie("light")):
        return {"session": session_id, "theme": theme}
```{% endraw %}

## Header parameter

{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/info")
class InfoController:
    def GET(self, user_agent: str | None = Header(None)):
        return {"ua": user_agent}
```{% endraw %}

## Custom header alias

{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/secure")
class SecureController:
    def GET(self, x_token: str = Header(alias="X-Token")):
        return {"token": x_token}
```{% endraw %}

Header names are lowercase with hyphens as underscores by default. Use `alias` for custom names.

## Reading cookies in templates

In `.nexy` templates, use the `useCookies()` hook:

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}

---

See also: [useCookies hook](/docs/hooks/useCookies), [Session config](/docs/config/session)