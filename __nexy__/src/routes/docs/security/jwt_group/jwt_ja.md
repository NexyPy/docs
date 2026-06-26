#JWT

Nexy は独自の JWT サポートを提供していません。`PyJWT` ライブラリを使用します。

## インストール

{% raw %}```bash
pip install pyjwt
```{% endraw %}

## トークンを作成する

{% raw %}```python
import jwt
from datetime import datetime, timedelta

SECRET = os.environ["JWT_SECRET"]

def create_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=24),
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")
```{% endraw %}

## トークンを検証する

{% raw %}```python
def verify_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
```{% endraw %}

## JWT 認証バックエンド

{% raw %}```python
class JWTAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        auth = conn.headers.get("Authorization", "")
        token = auth.removeprefix("Bearer ")
        payload = verify_token(token)
        if payload:
            return AuthCredentials(["authenticated"]), SimpleUser(payload["sub"])
        return None
```{% endraw %}

## 構成

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useAuth = {"backend": JWTAuthBackend()}
```{% endraw %}