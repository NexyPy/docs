# Passo a passo de autenticação

Este guia cria login, logout e um painel protegido do zero usando autenticação baseada em sessão.

## 1. Habilitar middleware de sessão

Em `nexyconfig.py`, habilite `useSession` — sessões de cookies assinadas da Starlette:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useSession = {"secret_key": "change-me-in-production"}
```{% endraw %}

Consulte [Session config](/docs/config/session) para opções.

## 2. Back-end e configuração de autenticação

Crie um back-end que leia o ID do usuário da sessão:

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

Adicione-o à configuração:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useSession = {"secret_key": "change-me"}
    useAuth = {"backend": SessionAuthBackend()}
```{% endraw %}

Consulte [Authentication reference](/docs/security/authentication) para mais tipos de back-end (token, JWT).

## 3. Página de login

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

## 4. Painel protegido

Proteja o painel com uma proteção — retorna `{"user": ...}` se autenticado, 401 caso contrário:

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

Consulte [Authorization](/docs/security/authorization) para escrever proteções personalizadas e ["@UseGuard reference](/docs/decorators/useguard).

## 5. Sair

Limpe a sessão para sair:

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

## 6. UI condicional em modelos

Verifique a sessão diretamente em qualquer modelo `.nexy`:

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

Consulte [useSession hook](/docs/hooks/useSession).

## O que vem a seguir?

- [Authentication reference](/docs/security/authentication) — back-ends de autenticação, JWT, OAuth
- [Authorization / Guards](/docs/security/authorization) — proteções personalizadas, escopos
- [JWT](/docs/security/jwt) — autenticação baseada em token
-[Session config](/docs/config/session)