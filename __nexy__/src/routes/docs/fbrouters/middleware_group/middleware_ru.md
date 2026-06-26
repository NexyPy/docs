# "@Middleware (FBR)

Примените вызовы промежуточного программного обеспечения к функции маршрута.

## Контракт промежуточного программного обеспечения

Промежуточное программное обеспечение — это любое вызываемое с помощью `__call__(self, request)`. Он получает объект FastAPI `Request` и запускается перед обработчиком.

{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}

## Промежуточное ПО для функции

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware())
def GET():
    ...
```{% endraw %}

## Несколько промежуточных программ

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware(), TimerMiddleware())
def GET():
    ...
```{% endraw %}

## Подпись

{% raw %}```python
Middleware(*middlewares: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

Промежуточное программное обеспечение запускается как FastAPI `Depends` — оно запускается перед обработчиком. В отличие от средств защиты, промежуточное программное обеспечение предназначено для побочных эффектов (ведение журнала, синхронизация), а не для блокировки запросов (хотя оно может повысить `HTTPException`).

---

См. также: [Middlewares](/docs/fbrouters/middlewares), ["@Middleware reference](/docs/decorators/middleware)