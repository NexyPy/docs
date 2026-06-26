# "@Middleware (FBR)

Apply middleware callables to a route function.

## Middleware contract

A middleware is any callable with `__call__(self, request)`. It receives the FastAPI `Request` object and runs before the handler.

{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}

## Middleware on a function

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware())
def GET():
    ...
```{% endraw %}

## Multiple middleware

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware(), TimerMiddleware())
def GET():
    ...
```{% endraw %}

## Signature

{% raw %}```python
Middleware(*middlewares: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

Middleware runs as FastAPI `Depends` — it runs before the handler. Unlike guards, middleware is intended for side effects (logging, timing), not for blocking requests (though it can raise `HTTPException`).

---

See also: [Middlewares](/docs/fbrouters/middlewares), ["@Middleware reference](/docs/decorators/middleware)