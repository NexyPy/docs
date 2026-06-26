# Middlewares

Eine Middleware ist eine Schicht, die vor und nach jeder Anfrage ausgeführt wird – nützlich für Protokollierung, Authentifizierung, CORS-Header und andere globale Belange.

---

## Erstellen einer Middleware

In Nexy werden Middlewares über Starlettes `BaseHTTPMiddleware` oder als Callables definiert:
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

## Registrieren einer Middleware

Übergeben Sie in `nexyconfig.py` eine Liste von `(MiddlewareClass, kwargs_dict)`-Tupeln:
{% raw %}```python
from nexy.core.models import NexyConfigModel
from src.middlewares import LoggingMiddleware

class NexyConfig(NexyConfigModel):
    useMiddlewares = [
        (LoggingMiddleware, {}),
    ]
```{% endraw %}
---

## Ausführungsreihenfolge

Middlewares werden in der Deklarationsreihenfolge ausgeführt und bilden einen **Stapel** (wie Starlette):
{% raw %}```text
Request → MW1 → MW2 → Route → MW2 → MW1 → Response
```{% endraw %}
---

## Middleware auf Verzeichnisebene (FBR)

Mit FBR können Sie Middleware-Logik in einem `dependencies.py` innerhalb eines Verzeichnisses platzieren:
{% raw %}```python
# routes/api/dependencies.py
from fastapi import Request

async def verify_api_key(request: Request):
    if request.headers.get("X-API-Key") != "secret":
        from fastapi import HTTPException
        raise HTTPException(status_code=403)
```{% endraw %}
Jede Seite unter `/api/` erbt diese Prüfung automatisch.
{% call Link(href="/docs/fbrouters/route_handlers") %}Next: Route Handlers →{% endcall %}