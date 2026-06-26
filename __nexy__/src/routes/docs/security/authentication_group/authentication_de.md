# Authentifizierung

Nexy bietet Middleware-basierte Authentifizierung über `AuthenticationMiddleware` von Starlette. Konfigurieren Sie es global in `nexyconfig.py`.

## Sitzungsbasierte Authentifizierung

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

## Tokenbasierte Authentifizierung

{% raw %}```python
class TokenAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        token = conn.headers.get("Authorization", "").removeprefix("Bearer ")
        user = await verify_token(token)
        if user:
            return AuthCredentials(["authenticated"]), SimpleUser(user.id)
        return None
```{% endraw %}

## Zugriffsbenutzer in Handlern

{% raw %}```python
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## Konfigurationsreferenz

| Feld | Geben Sie | ein Standard | Beschreibung |
|-------|------|---------|-------------|
| `useAuth` | `dict \| None` | `None` | Kwargs werden an Starlettes `AuthenticationMiddleware` weitergeleitet |
| `useSession` | `dict \| None` | `None` | Kwargs werden an Starlettes `SessionMiddleware` | weitergeleitet

---

Siehe auch: [Authorization](/docs/security/authorization), [JWT](/docs/security/jwt), [Auth Guide](/docs/guides/auth)