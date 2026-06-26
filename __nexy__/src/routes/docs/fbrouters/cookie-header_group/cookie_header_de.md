# Cookies und Header (FBR)

Lesen Sie HTTP-Cookies und Header mit den FastAPI-Parametern `Cookie` und `Header`.

## Cookie-Parameter

{% raw %}```python
# src/routes/profile.py
from fastapi import Cookie

def GET(session_id: str | None = Cookie(None)):
    return {"session_id": session_id}
```{% endraw %}

## Mehrere Cookies

{% raw %}```python
from fastapi import Cookie

def GET(
    session_id: str | None = Cookie(None),
    theme: str = Cookie("light"),
):
    return {"session": session_id, "theme": theme}
```{% endraw %}

## Header-Parameter

{% raw %}```python
from fastapi import Header

def GET(user_agent: str | None = Header(None)):
    return {"ua": user_agent}
```{% endraw %}

## Benutzerdefinierter Header-Alias

{% raw %}```python
from fastapi import Header

def GET(x_token: str = Header(alias="X-Token")):
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

Siehe auch: [Session config](/docs/config/session)