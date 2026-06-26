# "@UseGuard (FBR)

Aplicar chamadas de proteção a uma função de rota.

## Contrato de guarda

Um guarda pode ser chamado com `__call__(self, request)`. Aumente `HTTPException` para bloquear, retorne `None` para permitir.

{% raw %}```python
from fastapi import HTTPException

class RoleGuard:
    def __init__(self, role: str):
        self.role = role

    def __call__(self, request) -> None:
        if request.user.role != self.role:
            raise HTTPException(403)
```{% endraw %}

## Guarda em uma função

{% raw %}```python
from nexy.decorators import UseGuard

class AuthGuard:
    def __call__(self, request):
        if not request.user:
            raise HTTPException(401)

"@UseGuard(AuthGuard())
def GET():
    ...
```{% endraw %}

## Vários guardas

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

## Assinatura

{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

Os guardas são executados como FastAPI `Depends` — eles recebem o objeto `Request` e podem bloquear aumentando `HTTPException`.

---

Veja também: [Authorization](/docs/fbrouters/authorization), ["@UseGuard reference](/docs/decorators/useguard)