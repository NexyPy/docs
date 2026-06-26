# "@UseGuard

Aplique chamadas de proteção a uma classe de controlador ou método de manipulador individual.

## Contrato de guarda

Um guarda pode ser chamado com `__call__(self, request)`. Ele recebe o objeto FastAPI `Request`. Aumente `HTTPException` para bloquear, retorne `None` para permitir.
{% raw %}```python
from fastapi import HTTPException

class RoleGuard:
    def __init__(self, role: str):
        self.role = role

    def __call__(self, request) -> None:
        if request.user.role != self.role:
            raise HTTPException(403)
```{% endraw %}
---

## Guarda em uma rota
{% raw %}```python
---
from nexy.decorators import UseGuard

class AuthGuard:
    def __call__(self, request):
        if not request.user:
            raise HTTPException(401)

"@UseGuard(AuthGuard())
def GET():
    ...
---
```{% endraw %}
{% raw %}```python
from nexy.decorators import UseGuard, Controller

class AuthGuard:
    def __call__(self, request):
        if not request.user:
            raise HTTPException(401)

"@Controller("/users")
"@UseGuard(AuthGuard())
class UsersController:
    def GET(self) -> list[dict]:
        ...

    "@UseGuard(AdminGuard())
    def delete(self, user_id: int) -> dict:
        ...
```{% endraw %}
## Vários guardas
{% raw %}```python
---
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
---
```{% endraw %}
{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}
## Assinatura
{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}
## Pedido

Os protetores em nível de classe são executados antes dos protetores em nível de método. Todos são executados como FastAPI `Depends`.