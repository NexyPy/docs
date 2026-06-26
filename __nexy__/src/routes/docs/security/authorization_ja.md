# Authorization

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
---

## Guard on a route
{% raw %}```python
---
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
---
```{% endraw %}
{% raw %}```python
from nexy.decorators import Controller, UseGuard
from starlette.authentication import requires

"@Controller("/admin")
"@UseGuard(requires("authenticated"))
class AdminController:
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}
## Multiple guards
{% raw %}```python
---
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RateLimitGuard())
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
## Using `requires` from Starlette
{% raw %}```python
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}
Works in both FBR and Modular — `requires` returns a valid guard callable.

---

## Related

- ["@UseGuard reference](/docs/decorators/useguard) — full decorator API
- [Guards (Modular)](/docs/modular/guards) — guard injection in Modular DI
- [Authentication](/docs/security/authentication) — setting up auth backends