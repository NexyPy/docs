# 인증

Nexy는 Starlette의 `AuthenticationMiddleware`를 통해 미들웨어 기반 인증을 제공합니다. `nexyconfig.py`에서 전역적으로 구성합니다.

## 세션 기반 인증

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

## 토큰 기반 인증

{% raw %}```python
class TokenAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        token = conn.headers.get("Authorization", "").removeprefix("Bearer ")
        user = await verify_token(token)
        if user:
            return AuthCredentials(["authenticated"]), SimpleUser(user.id)
        return None
```{% endraw %}

## 핸들러의 사용자 액세스

{% raw %}```python
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## 구성 참조

| 필드 | 유형 | 기본값 | 설명 |
|---------|------|---------|-------------|
| `useAuth` | `dict \| None` | `None` | Kwargs가 Starlette의 `AuthenticationMiddleware`로 전달됨 |
| `useSession` | `dict \| None` | `None` | Kwargs가 Starlette의 `SessionMiddleware`로 전달됨 |

---

참조: [Authorization](/docs/security/authorization), [JWT](/docs/security/jwt), [Auth Guide](/docs/guides/auth)