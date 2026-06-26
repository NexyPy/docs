# Промежуточное ПО

Промежуточное программное обеспечение — это уровень, который запускается до и после каждого запроса, что полезно для ведения журналов, аутентификации, заголовков CORS и других глобальных задач.

---

## Создание промежуточного программного обеспечения

В Nexy промежуточное ПО определяется через `BaseHTTPMiddleware` Starlette или как вызываемые объекты:
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

## Регистрация промежуточного программного обеспечения

В `nexyconfig.py` передайте список кортежей `(MiddlewareClass, kwargs_dict)`:
{% raw %}```python
from nexy.core.models import NexyConfigModel
from src.middlewares import LoggingMiddleware

class NexyConfig(NexyConfigModel):
    useMiddlewares = [
        (LoggingMiddleware, {}),
    ]
```{% endraw %}
---

## Порядок выполнения

Промежуточное ПО запускается в порядке объявления, образуя **стек** (например, Starlette):
{% raw %}```text
Request → MW1 → MW2 → Route → MW2 → MW1 → Response
```{% endraw %}
---

## Промежуточное программное обеспечение уровня каталога (FBR)

С помощью FBR вы можете разместить логику промежуточного программного обеспечения в `dependencies.py` внутри каталога:
{% raw %}```python
# routes/api/dependencies.py
from fastapi import Request

async def verify_api_key(request: Request):
    if request.headers.get("X-API-Key") != "secret":
        from fastapi import HTTPException
        raise HTTPException(status_code=403)
```{% endraw %}
Каждая страница под `/api/` автоматически наследует эту проверку.
{% call Link(href="/docs/fbrouters/route_handlers") %}Next: Route Handlers →{% endcall %}