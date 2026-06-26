# Middlewares

Um middleware é uma camada executada antes e depois de cada solicitação – útil para registro, autenticação, cabeçalhos CORS e outras questões globais.

---

## Criando um middleware

No Nexy, os middlewares são definidos por meio do `BaseHTTPMiddleware` da Starlette ou como chamáveis:
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

## Registrando um middleware

Em `nexyconfig.py`, passe uma lista de tuplas `(MiddlewareClass, kwargs_dict)`:
{% raw %}```python
from nexy.core.models import NexyConfigModel
from src.middlewares import LoggingMiddleware

class NexyConfig(NexyConfigModel):
    useMiddlewares = [
        (LoggingMiddleware, {}),
    ]
```{% endraw %}
---

## Ordem de execução

Middlewares são executados em ordem de declaração, formando uma **pilha** (como Starlette):
{% raw %}```text
Request → MW1 → MW2 → Route → MW2 → MW1 → Response
```{% endraw %}
---

## Middleware em nível de diretório (FBR)

Com FBR, você pode colocar a lógica do middleware em `dependencies.py` dentro de um diretório:
{% raw %}```python
# routes/api/dependencies.py
from fastapi import Request

async def verify_api_key(request: Request):
    if request.headers.get("X-API-Key") != "secret":
        from fastapi import HTTPException
        raise HTTPException(status_code=403)
```{% endraw %}
Cada página em `/api/` herda esta verificação automaticamente.
{% call Link(href="/docs/fbrouters/route_handlers") %}Next: Route Handlers →{% endcall %}