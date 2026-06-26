# 智威汤逊

Nexy 不提供自己的 JWT 支持 - 使用 `PyJWT` 库。

＃＃ 安装

{% raw %}```bash
pip install pyjwt
```{% endraw %}

## 创建一个令牌

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

## 验证令牌

{% raw %}```python
def verify_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
```{% endraw %}

## JWT 身份验证后端

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

## 配置

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useAuth = {"backend": JWTAuthBackend()}
```{% endraw %}