# "@Middleware (FBR)

Aplicar llamadas de middleware a una función de ruta.

## Contrato de middleware

Un middleware es cualquier invocable con `__call__(self, request)`. Recibe el objeto FastAPI `Request` y se ejecuta antes que el controlador.

{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}

## Middleware en una función

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware())
def GET():
    ...
```{% endraw %}

## Múltiples middleware

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware(), TimerMiddleware())
def GET():
    ...
```{% endraw %}

## Firma

{% raw %}```python
Middleware(*middlewares: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

El middleware se ejecuta como FastAPI `Depends`: se ejecuta antes que el controlador. A diferencia de los guardias, el middleware está diseñado para efectos secundarios (registro, sincronización), no para bloquear solicitudes (aunque puede generar `HTTPException`).

---

Ver también: [Middlewares](/docs/fbrouters/middlewares), ["@Middleware reference](/docs/decorators/middleware)