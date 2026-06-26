# "@Middleware (FBR)

Appliquez des callables middleware à une fonction de route.

## Contrat middleware

Un middleware peut être appelé avec `__call__(self, request)`. Il reçoit l'objet FastAPI `Request` et s'exécute avant le gestionnaire.

{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}

## Middleware sur une fonction

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware())
def GET():
    ...
```{% endraw %}

## Plusieurs middlewares

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

Le middleware s'exécute en tant que FastAPI `Depends` – il s'exécute avant le gestionnaire. Contrairement aux gardes, le middleware est destiné aux effets secondaires (journalisation, synchronisation), et non au blocage des requêtes (bien qu'il puisse augmenter `HTTPException`).

---

Voir aussi : [Middlewares](/docs/fbrouters/middlewares), ["@Middleware reference](/docs/decorators/middleware)