# جي دبليو تي

لا تقوم Nexy بشحن دعم JWT الخاص بها — استخدم مكتبة `PyJWT`.

## تثبيت

{% raw %}```bash
pip install pyjwt
```{% endraw %}

## إنشاء رمز مميز

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

## التحقق من الرمز المميز

{% raw %}```python
def verify_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
```{% endraw %}

## مصادقة JWT الخلفية

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

## التكوين

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useAuth = {"backend": JWTAuthBackend()}
```{% endraw %}