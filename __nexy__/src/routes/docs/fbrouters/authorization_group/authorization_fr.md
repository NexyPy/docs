# Autorisation (FBR)

Protégez les itinéraires à l'aide de décorateurs `"@UseGuard` avec des gardes appelables.

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

## Garde sur un itinéraire

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

## Utilisation du `requires` de Starlette

{% raw %}```python
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## Plusieurs gardes

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

---

Voir aussi : ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)