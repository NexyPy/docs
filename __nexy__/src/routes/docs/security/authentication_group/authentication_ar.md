# المصادقة

توفر Nexy مصادقة قائمة على البرامج الوسيطة عبر `AuthenticationMiddleware` من Starlette. قم بتكوينه عالميًا في `nexyconfig.py`.

## المصادقة المستندة إلى الجلسة

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

## المصادقة المستندة إلى الرمز المميز

{% raw %}```python
class TokenAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        token = conn.headers.get("Authorization", "").removeprefix("Bearer ")
        user = await verify_token(token)
        if user:
            return AuthCredentials(["authenticated"]), SimpleUser(user.id)
        return None
```{% endraw %}

## الوصول إلى المستخدم في المعالجات

{% raw %}```python
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## مرجع التكوين

| المجال | اكتب | الافتراضي | الوصف |
|-------|------|---------|-------------|
| `useAuth` | `dict \| None` | `None` | عاد Kwargs إلى `AuthenticationMiddleware` من Starlette |
| `useSession` | `dict \| None` | `None` | عاد Kwargs إلى `SessionMiddleware` من Starlette |

---

أنظر أيضا: [Authorization](/docs/security/authorization)، [JWT](/docs/security/jwt)، [Auth Guide](/docs/guides/auth)