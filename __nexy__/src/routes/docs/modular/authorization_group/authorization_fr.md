# Gardes et autorisation (modulaire)

Protégez les contrôleurs et les routes en utilisant `"@UseGuard` avec des callables de garde.

## Contrat de garde

Un garde peut être appelé avec `__call__(self, request)`. Augmentez `HTTPException` pour bloquer, renvoyez `None` pour autoriser.

{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}

## Garde au niveau du contrôleur

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

## Plusieurs gardes

{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}

Les gardes au niveau de la classe courent avant les gardes au niveau de la méthode. Tous fonctionnent en tant que FastAPI `Depends`.

## Garde au niveau de la méthode

{% raw %}```python
from nexy.decorators import Controller, UseGuard

"@Controller("/users")
class UsersController:
    "@UseGuard(AuthGuard())
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

Fonctionne à la fois au niveau du contrôleur et de la méthode.

---

Voir aussi : [Guards](/docs/modular/guards), ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)