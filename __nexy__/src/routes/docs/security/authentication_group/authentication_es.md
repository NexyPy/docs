# Autenticación

Nexy proporciona autenticación basada en middleware a través de `AuthenticationMiddleware` de Starlette. Configurarlo globalmente en `nexyconfig.py`.

## Autenticación basada en sesiones

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

## Autenticación basada en tokens

{% raw %}```python
class TokenAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        token = conn.headers.get("Authorization", "").removeprefix("Bearer ")
        user = await verify_token(token)
        if user:
            return AuthCredentials(["authenticated"]), SimpleUser(user.id)
        return None
```{% endraw %}

## Acceder al usuario en controladores

{% raw %}```python
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## Referencia de configuración

| Campo | Tipo | Predeterminado | Descripción |
|-------|------|---------|-------------|
| `useAuth` | `dict \| None` | `None` | Kwargs reenvió a `AuthenticationMiddleware` de Starlette |
| `useSession` | `dict \| None` | `None` | Kwargs reenvió al `SessionMiddleware` de Starlette |

---

Ver también: [Authorization](/docs/security/authorization), [JWT](/docs/security/jwt), [Auth Guide](/docs/guides/auth)