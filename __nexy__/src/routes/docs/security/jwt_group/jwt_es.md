#JWT

Nexy no incluye su propio soporte JWT; utilice la biblioteca `PyJWT`.

## Instalación

{% raw %}```bash
pip install pyjwt
```{% endraw %}

## Crear una ficha

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

## Verificar un token

{% raw %}```python
def verify_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
```{% endraw %}

## Backend de autenticación JWT

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

## Configuración

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useAuth = {"backend": JWTAuthBackend()}
```{% endraw %}