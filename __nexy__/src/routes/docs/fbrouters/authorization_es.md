# Authorization (FBR)

Protect routes using `"@UseGuard` decorators with guard callables.

## Guard contract

A guard is any callable with `__call__(self, request)`. Raise `HTTPException` to block, return `None` to allow.

{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}

## Guard on a route

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

## Using Starlette's `requires`

{% raw %}```python
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## Multiple guards

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

---

See also: ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)