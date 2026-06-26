# "@Middleware

Wenden Sie aufrufbare Middleware auf eine Controller-Klasse oder Handler-Methode an.

## Middleware-Vertrag

Eine Middleware ist beliebig mit `__call__(self, request)` aufrufbar. Es empfängt das FastAPI-Objekt `Request` und wird vor dem Handler ausgeführt.
{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}
---

## Middleware auf einer Route
{% raw %}```python
---
from nexy.decorators import Middleware

class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")

"@Middleware(LoggingMiddleware())
def GET():
    ...
---
```{% endraw %}
{% raw %}```python
from nexy.decorators import Middleware, Controller

"@Controller("/users")
"@Middleware(LoggingMiddleware())
class UsersController:
    def GET(self) -> list[dict]:
        ...
```{% endraw %}
## Mehrere Middleware
{% raw %}```python
---
from nexy.decorators import Middleware

class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")

class TimerMiddleware:
    def __call__(self, request) -> None:
        print("timing")

"@Middleware(LoggingMiddleware(), TimerMiddleware())
def GET():
    ...
---
```{% endraw %}
{% raw %}```python
"@Middleware(LoggingMiddleware(), TimerMiddleware())
class UsersController:
    def GET(self):
        ...
```{% endraw %}
## Unterschrift
{% raw %}```python
Middleware(*middlewares: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}
## Guards vs. Middleware

| | Wachen | Middleware |
|---|--------|-----------|
| Zweck | Autorisierung | Nebenwirkungen (Protokollierung, Timing) |
| Anfrage sperren | Ja (löst HTTPException aus) | Nein (es sei denn, Sie erhöhen) |
| Läuft als | FastAPI `Depends` | FastAPI `Depends` |
| Bestellen | Klassenwächter → Methodenwächter | Klassen-Middleware → Methoden-Middleware |

Beide laufen als FastAPI `Depends` Abhängigkeiten. Reihenfolge: Klassenwächter → Klassen-Middleware → Methodenwächter → Methoden-Middleware.