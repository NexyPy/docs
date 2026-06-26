# Cookies et en-têtes (FBR)

Lisez les cookies et les en-têtes HTTP à l'aide des paramètres `Cookie` et `Header` de FastAPI.

## Paramètre des cookies

{% raw %}```python
# src/routes/profile.py
from fastapi import Cookie

def GET(session_id: str | None = Cookie(None)):
    return {"session_id": session_id}
```{% endraw %}

## Plusieurs cookies

{% raw %}```python
from fastapi import Cookie

def GET(
    session_id: str | None = Cookie(None),
    theme: str = Cookie("light"),
):
    return {"session": session_id, "theme": theme}
```{% endraw %}

## Paramètre d'en-tête

{% raw %}```python
from fastapi import Header

def GET(user_agent: str | None = Header(None)):
    return {"ua": user_agent}
```{% endraw %}

## Alias ​​d'en-tête personnalisé

{% raw %}```python
from fastapi import Header

def GET(x_token: str = Header(alias="X-Token")):
    return {"token": x_token}
```{% endraw %}

Les noms d'en-tête sont en minuscules avec des traits d'union comme traits de soulignement par défaut. Utilisez `alias` pour les noms personnalisés.

## Lecture des cookies dans les modèles

Dans les modèles `.nexy`, utilisez le hook `useCookies()` :

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}

---

Voir aussi : [Session config](/docs/config/session)