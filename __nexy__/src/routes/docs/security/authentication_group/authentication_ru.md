# Аутентификация

Nexy обеспечивает аутентификацию на основе промежуточного программного обеспечения через `AuthenticationMiddleware` от Starlette. Настройте его глобально в `nexyconfig.py`.

## Аутентификация на основе сеанса

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

## Аутентификация на основе токенов

{% raw %}```python
class TokenAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        token = conn.headers.get("Authorization", "").removeprefix("Bearer ")
        user = await verify_token(token)
        if user:
            return AuthCredentials(["authenticated"]), SimpleUser(user.id)
        return None
```{% endraw %}

## Доступ к пользователю в обработчиках

{% raw %}```python
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## Справочник по конфигурации

| Поле | Тип | По умолчанию | Описание |
|-------|------|---------|-------------|
| `useAuth` | `dict \| None` | `None` | Кваргс перенаправлен на `AuthenticationMiddleware` Старлетты |
| `useSession` | `dict \| None` | `None` | Кваргс перенаправлен на `SessionMiddleware` Старлетты |

---

См. также: [Authorization](/docs/security/authorization), [JWT](/docs/security/jwt), [Auth Guide](/docs/guides/auth)