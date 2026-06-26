# "@Middleware (FBR)

Wenden Sie aufrufbare Middleware auf eine Routenfunktion an.

## Middleware-Vertrag

Eine Middleware ist beliebig mit `__call__(self, request)` aufrufbar. Es empfängt das FastAPI-Objekt `Request` und wird vor dem Handler ausgeführt.

{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}

## Middleware für eine Funktion

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware())
def GET():
    ...
```{% endraw %}

## Mehrere Middleware

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware(), TimerMiddleware())
def GET():
    ...
```{% endraw %}

## Unterschrift

{% raw %}```python
Middleware(*middlewares: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

Middleware wird als FastAPI `Depends` ausgeführt – sie wird vor dem Handler ausgeführt. Im Gegensatz zu Guards ist Middleware für Nebeneffekte (Protokollierung, Timing) gedacht und nicht für das Blockieren von Anfragen (obwohl sie `HTTPException` auslösen kann).

---

Siehe auch: [Middlewares](/docs/fbrouters/middlewares), ["@Middleware reference](/docs/decorators/middleware)