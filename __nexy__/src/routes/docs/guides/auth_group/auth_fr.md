# Procédure pas à pas d'authentification

Ce guide crée la connexion, la déconnexion et un tableau de bord protégé à partir de zéro à l'aide de l'authentification basée sur la session.

## 1. Activer le middleware de session

Dans `nexyconfig.py`, activez `useSession` — les sessions de cookies signées de Starlette :

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useSession = {"secret_key": "change-me-in-production"}
```{% endraw %}

Voir [Session config](/docs/config/session) pour les options.

## 2. Authentifier le backend et la configuration

Créez un backend qui lit l'ID utilisateur de la session :

{% raw %}```python
# src/auth.py
from starlette.authentication import AuthCredentials, AuthenticationBackend, SimpleUser

class SessionAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        user_id = conn.session.get("user_id")
        if user_id:
            return AuthCredentials(["authenticated"]), SimpleUser(user_id)
        return None
```{% endraw %}

Ajoutez-le à la configuration :

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useSession = {"secret_key": "change-me"}
    useAuth = {"backend": SessionAuthBackend()}
```{% endraw %}

Voir [Authentication reference](/docs/security/authentication) pour plus de types de backend (jeton, JWT).

## 3. Page de connexion

{% raw %}```nexy
# src/routes/login.nexy
---
from nexy import useSession
from src.db import authenticate_user

def POST(username: str, password: str):
    user = authenticate_user(username, password)
    if not user:
        return {"error": "Invalid credentials"}
    session = useSession()
    session["user_id"] = user.id
    return Redirect("/dashboard")
---
<form method="POST">
  <input name="username" placeholder="Username">
  <input name="password" type="password" placeholder="Password">
  <button>Sign in</button>
</form>
```{% endraw %}

## 4. Tableau de bord protégé

Protégez le tableau de bord avec une protection — renvoie `{"user": ...}` si authentifié, 401 sinon :

{% raw %}```nexy
# src/routes/dashboard.nexy
---
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
---
<h1>Dashboard</h1>
<p>Welcome, {{ user }}!</p>
```{% endraw %}

Voir [Authorization](/docs/security/authorization) pour l'écriture de gardes personnalisées et ["@UseGuard reference](/docs/decorators/useguard).

## 5. Déconnexion

Effacez la session pour vous déconnecter :

{% raw %}```nexy
# src/routes/logout.nexy
---
from nexy import useSession

def POST():
    session = useSession()
    session.clear()
    return Redirect("/login")
---
```{% endraw %}

## 6. UI conditionnelle dans les modèles

Vérifiez la session directement dans n'importe quel modèle `.nexy` :

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
---
<header>
  {% if session.get("user_id") %}
    <a href="/dashboard">Dashboard</a>
    <form method="POST" action="/logout">
      <button>Sign out</button>
    </form>
  {% else %}
    <a href="/login">Sign in</a>
  {% endif %}
</header>
```{% endraw %}

Voir [useSession hook](/docs/hooks/useSession).

## Quelle est la prochaine étape ?

- [Authentication reference](/docs/security/authentication) — backends d'authentification, JWT, OAuth
- [Authorization / Guards](/docs/security/authorization) — protections personnalisées, lunettes
- [JWT](/docs/security/jwt) — authentification basée sur un jeton
- [Session config](/docs/config/session)