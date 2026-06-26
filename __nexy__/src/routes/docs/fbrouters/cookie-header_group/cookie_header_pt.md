# Cookies e cabeçalhos (FBR)

Leia cookies e cabeçalhos HTTP usando os parâmetros `Cookie` e `Header` do FastAPI.

## Parâmetro de cookie

{% raw %}```python
# src/routes/profile.py
from fastapi import Cookie

def GET(session_id: str | None = Cookie(None)):
    return {"session_id": session_id}
```{% endraw %}

## Vários cookies

{% raw %}```python
from fastapi import Cookie

def GET(
    session_id: str | None = Cookie(None),
    theme: str = Cookie("light"),
):
    return {"session": session_id, "theme": theme}
```{% endraw %}

## Parâmetro de cabeçalho

{% raw %}```python
from fastapi import Header

def GET(user_agent: str | None = Header(None)):
    return {"ua": user_agent}
```{% endraw %}

## Alias ​​de cabeçalho personalizado

{% raw %}```python
from fastapi import Header

def GET(x_token: str = Header(alias="X-Token")):
    return {"token": x_token}
```{% endraw %}

Os nomes dos cabeçalhos são minúsculos com hífens como sublinhados por padrão. Use `alias` para nomes personalizados.

## Lendo cookies em modelos

Nos modelos `.nexy`, use o gancho `useCookies()`:

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}

---

Veja também: [Session config](/docs/config/session)