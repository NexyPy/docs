# "@UseGuard

Aplique llamadas de protección a una clase de controlador o a un método de controlador individual.

## Contrato de guardia

Un guardia es cualquier invocable con `__call__(self, request)`. Recibe el objeto FastAPI `Request`. Levante `HTTPException` para bloquear, devuelva `None` para permitir.
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

## Guardia en una ruta
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
## Múltiples guardias
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
## Firma
{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}
## Orden

Los guardias de nivel de clase corren antes que los guardias de nivel de método. Todos se ejecutan como FastAPI `Depends`.