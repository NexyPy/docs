# Guardias y Autorización (Modular)

Proteja controladores y rutas usando `"@UseGuard` con guardias invocables.

## Contrato de guardia

Un guardia es cualquier persona a la que se pueda llamar con `__call__(self, request)`. Levante `HTTPException` para bloquear, devuelva `None` para permitir.

{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}

## Guardia a nivel de controlador

{% raw %}```python
from nexy.decorators import Controller, UseGuard

class AuthGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)

"@Controller("/admin")
"@UseGuard(AuthGuard())
class AdminController:
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

## Múltiples guardias

{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}

Los guardias de nivel de clase corren antes que los guardias de nivel de método. Todos se ejecutan como FastAPI `Depends`.

## Guardia a nivel de método

{% raw %}```python
from nexy.decorators import Controller, UseGuard

"@Controller("/users")
class UsersController:
    "@UseGuard(AuthGuard())
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

Funciona tanto a nivel de controlador como de método.

---

Ver también: [Guards](/docs/modular/guards), ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)