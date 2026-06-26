# Cookies y encabezados (modulares)

Lea las cookies y los encabezados HTTP utilizando `Cookie` y `Header` de FastAPI en los controladores.

## Parámetro de cookie

{% raw %}```python
from nexy.decorators import Controller
from fastapi import Cookie

"@Controller("/profile")
class ProfileController:
    def GET(self, session_id: str | None = Cookie(None)):
        return {"session_id": session_id}
```{% endraw %}

## Múltiples cookies

{% raw %}```python
from fastapi import Cookie
from nexy.decorators import Controller

"@Controller("/settings")
class SettingsController:
    def GET(self, session_id: str | None = Cookie(None), theme: str = Cookie("light")):
        return {"session": session_id, "theme": theme}
```{% endraw %}

## Parámetro de encabezado

{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/info")
class InfoController:
    def GET(self, user_agent: str | None = Header(None)):
        return {"ua": user_agent}
```{% endraw %}

## Alias ​​de encabezado personalizado

{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/secure")
class SecureController:
    def GET(self, x_token: str = Header(alias="X-Token")):
        return {"token": x_token}
```{% endraw %}

Los nombres de los encabezados están en minúsculas con guiones bajos de forma predeterminada. Utilice `alias` para nombres personalizados.

## Leer cookies en plantillas

En las plantillas `.nexy`, utilice el gancho `useCookies()`:

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}

---

Ver también: [useCookies hook](/docs/hooks/useCookies), [Session config](/docs/config/session)