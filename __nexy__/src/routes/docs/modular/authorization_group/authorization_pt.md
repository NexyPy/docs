# Guardas e Autorização (Modular)

Proteja controladores e rotas usando `"@UseGuard` com chamadas de proteção.

## Contrato de guarda

Um guarda pode ser chamado com `__call__(self, request)`. Aumente `HTTPException` para bloquear, retorne `None` para permitir.

{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}

## Proteção no nível do controlador

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

## Vários guardas

{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}

Os protetores em nível de classe são executados antes dos protetores em nível de método. Todos são executados como FastAPI `Depends`.

## Proteção em nível de método

{% raw %}```python
from nexy.decorators import Controller, UseGuard

"@Controller("/users")
class UsersController:
    "@UseGuard(AuthGuard())
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

Funciona tanto no nível do controlador quanto no nível do método.

---

Veja também: [Guards](/docs/modular/guards), ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)