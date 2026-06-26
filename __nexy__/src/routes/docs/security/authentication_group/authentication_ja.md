# 認証

Nexy は、Starlette の `AuthenticationMiddleware` を介してミドルウェア ベースの認証を提供します。 `nexyconfig.py` でグローバルに構成します。

## セッションベースの認証

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

## トークンベースの認証

{% raw %}```python
class TokenAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        token = conn.headers.get("Authorization", "").removeprefix("Bearer ")
        user = await verify_token(token)
        if user:
            return AuthCredentials(["authenticated"]), SimpleUser(user.id)
        return None
```{% endraw %}

## ハンドラー内のユーザーにアクセスする

{% raw %}```python
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## 構成リファレンス

|フィールド |タイプ |デフォルト |説明 |
|----------|------|----------|---------------|
| `useAuth` | `dict \| None` | `None` | Kwargs は Starlette の `AuthenticationMiddleware` に転送されました |
| `useSession` | `dict \| None` | `None` | Kwargs は Starlette の `SessionMiddleware` に転送されました |

---

関連項目: [Authorization](/docs/security/authorization)、[JWT](/docs/security/jwt)、[Auth Guide](/docs/guides/auth)