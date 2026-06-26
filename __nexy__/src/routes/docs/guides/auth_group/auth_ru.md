# Прохождение аутентификации

В этом руководстве создается вход в систему, выход из системы и защищенная панель мониторинга с нуля с использованием аутентификации на основе сеанса.

## 1. Включить промежуточное программное обеспечение сеанса

В `nexyconfig.py` включите `useSession` — подписанные сеансы cookie Starlette:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useSession = {"secret_key": "change-me-in-production"}
```{% endraw %}

См. параметры [Session config](/docs/config/session).

## 2. Серверная часть и конфигурация аутентификации

Создайте серверную часть, которая считывает идентификатор пользователя из сеанса:

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

Добавьте его в конфиг:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useSession = {"secret_key": "change-me"}
    useAuth = {"backend": SessionAuthBackend()}
```{% endraw %}

См. [Authentication reference](/docs/security/authentication) для получения дополнительных типов серверной части (токен, JWT).

## 3. Страница входа

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

## 4. Защищенная панель управления

Защитите панель мониторинга с помощью защиты — возвращает `{"user": ...}` при аутентификации, 401 в противном случае:

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

См. [Authorization](/docs/security/authorization) для написания пользовательских средств защиты и ["@UseGuard reference](/docs/decorators/useguard).

## 5. Выход из системы

Очистите сеанс, чтобы выйти:

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

## 6. Условный интерфейс в шаблонах

Проверьте сессию напрямую в любом шаблоне `.nexy`:

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

См. [useSession hook](/docs/hooks/useSession).

## Что дальше?

- [Authentication reference](/docs/security/authentication) — серверы аутентификации, JWT, OAuth
- [Authorization / Guards](/docs/security/authorization) — пользовательские охранники, области видимости
- [JWT](/docs/security/jwt) — аутентификация на основе токена
- [Session config](/docs/config/session)