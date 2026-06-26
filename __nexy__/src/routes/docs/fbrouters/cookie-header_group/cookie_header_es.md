# Cookies y encabezados (FBR)

Lea las cookies y los encabezados HTTP utilizando los parámetros `Cookie` y `Header` de FastAPI.

## Parámetro de cookie

{% raw %}```python
# src/routes/profile.py
from fastapi import Cookie

def GET(session_id: str | None = Cookie(None)):
    return {"session_id": session_id}
```{% endraw %}

## Múltiples cookies

{% raw %}```python
from fastapi import Cookie

def GET(
    session_id: str | None = Cookie(None),
    theme: str = Cookie("light"),
):
    return {"session": session_id, "theme": theme}
```{% endraw %}

## Parámetro de encabezado

{% raw %}```python
from fastapi import Header

def GET(user_agent: str | None = Header(None)):
    return {"ua": user_agent}
```{% endraw %}

## Alias ​​de encabezado personalizado

{% raw %}```python
from fastapi import Header

def GET(x_token: str = Header(alias="X-Token")):
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

Ver también: [Session config](/docs/config/session)