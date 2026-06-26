# Authentication

Nexy provides middleware-based authentication via Starlette's `AuthenticationMiddleware`. Configure it globally in `nexyconfig.py`.

## Session-Based Auth

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

{% raw %}```python
# nexyconfig.py
class NexyConfig(NexyConfigModel):
    useSession = {"secret_key": "change-me"}
    useAuth = {"backend": SessionAuthBackend()}
```{% endraw %}

## Token-Based Auth

{% raw %}```python
class TokenAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        token = conn.headers.get("Authorization", "").removeprefix("Bearer ")
        user = await verify_token(token)
        if user:
            return AuthCredentials(["authenticated"]), SimpleUser(user.id)
        return None
```{% endraw %}

## Access User in Handlers

{% raw %}```python
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## Config Reference

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `useAuth` | `dict \| None` | `None` | Kwargs forwarded to Starlette's `AuthenticationMiddleware` |
| `useSession` | `dict \| None` | `None` | Kwargs forwarded to Starlette's `SessionMiddleware` |

---

See also: [Authorization](/docs/security/authorization), [JWT](/docs/security/jwt), [Auth Guide](/docs/guides/auth)