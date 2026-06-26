# software intermedio

Un middleware es una capa que se ejecuta antes y después de cada solicitud, lo que resulta útil para el registro, la autenticación, los encabezados CORS y otras cuestiones globales.

---

## Creando un middleware

En Nexy, los middlewares se definen a través de `BaseHTTPMiddleware` de Starlette o como invocables:
{% raw %}```python
# src/middlewares.py
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print(f"→ {request.method} {request.url.path}")
        response = await call_next(request)
        print(f"← {response.status_code}")
        return response
```{% endraw %}
---

## Registrar un middleware

En `nexyconfig.py`, pase una lista de tuplas `(MiddlewareClass, kwargs_dict)`:
{% raw %}```python
from nexy.core.models import NexyConfigModel
from src.middlewares import LoggingMiddleware

class NexyConfig(NexyConfigModel):
    useMiddlewares = [
        (LoggingMiddleware, {}),
    ]
```{% endraw %}
---

## Orden de ejecución

Los middlewares se ejecutan en orden de declaración, formando una **pila** (como Starlette):
{% raw %}```text
Request → MW1 → MW2 → Route → MW2 → MW1 → Response
```{% endraw %}
---

## Middleware a nivel de directorio (FBR)

Con FBR, puedes colocar la lógica del middleware en un `dependencies.py` dentro de un directorio:
{% raw %}```python
# routes/api/dependencies.py
from fastapi import Request

async def verify_api_key(request: Request):
    if request.headers.get("X-API-Key") != "secret":
        from fastapi import HTTPException
        raise HTTPException(status_code=403)
```{% endraw %}
Cada página bajo `/api/` hereda esta verificación automáticamente.
{% call Link(href="/docs/fbrouters/route_handlers") %}Next: Route Handlers →{% endcall %}