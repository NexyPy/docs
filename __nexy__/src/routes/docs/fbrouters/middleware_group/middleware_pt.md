# "@Middleware (FBR)

Aplique callables de middleware a uma função de rota.

## Contrato de middleware

Um middleware é qualquer coisa que possa ser chamada com `__call__(self, request)`. Ele recebe o objeto FastAPI `Request` e é executado antes do manipulador.

{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}

## Middleware em uma função

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware())
def GET():
    ...
```{% endraw %}

## Múltiplos middlewares

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware(), TimerMiddleware())
def GET():
    ...
```{% endraw %}

## Assinatura

{% raw %}```python
Middleware(*middlewares: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

O middleware é executado como FastAPI `Depends` — é executado antes do manipulador. Ao contrário dos guardas, o middleware destina-se a efeitos colaterais (registro, temporização), não ao bloqueio de solicitações (embora possa aumentar `HTTPException`).

---

Veja também: [Middlewares](/docs/fbrouters/middlewares), ["@Middleware reference](/docs/decorators/middleware)