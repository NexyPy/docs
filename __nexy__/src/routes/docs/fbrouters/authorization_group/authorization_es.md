# Autorización (FBR)

Proteja las rutas utilizando `"@UseGuard` decoradores con guardias invocables.

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

## Guardia en una ruta

{% raw %}```python
# src/routes/admin.py
from nexy.decorators import UseGuard
from starlette.authentication import requires

class AuthGuard:
    def __call__(self, request):
        if not request.user:
            raise HTTPException(401)

"@UseGuard(AuthGuard())
def GET():
    ...
```{% endraw %}

## Usando `requires` de Starlette

{% raw %}```python
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## Múltiples guardias

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

---

Ver también: ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)