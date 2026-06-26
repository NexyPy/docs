# Authentification

Nexy fournit une authentification basée sur un middleware via `AuthenticationMiddleware` de Starlette. Configurez-le globalement dans `nexyconfig.py`.

## Authentification basée sur la session

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

## Authentification basée sur des jetons

{% raw %}```python
class TokenAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        token = conn.headers.get("Authorization", "").removeprefix("Bearer ")
        user = await verify_token(token)
        if user:
            return AuthCredentials(["authenticated"]), SimpleUser(user.id)
        return None
```{% endraw %}

## Accéder à l'utilisateur dans les gestionnaires

{% raw %}```python
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## Référence de configuration

| Champ | Tapez | Par défaut | Descriptif |
|-------|------|---------|-------------|
| `useAuth` | `dict \| None` | `None` | Kwargs transféré au `AuthenticationMiddleware` de Starlette |
| `useSession` | `dict \| None` | `None` | Kwargs transféré au `SessionMiddleware` de Starlette |

---

Voir aussi : [Authorization](/docs/security/authorization), [JWT](/docs/security/jwt), [Auth Guide](/docs/guides/auth)