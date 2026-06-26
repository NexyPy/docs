# Авторизация (FBR)

Защитите маршруты с помощью декораторов `"@UseGuard` с вызываемыми объектами защиты.

## Контракт охраны

Охранником является любой вызываемый с помощью `__call__(self, request)`. Поднимите `HTTPException`, чтобы заблокировать, верните `None`, чтобы разрешить.

{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}

## Охранник на маршруте

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

## Использование `requires` от Starlette

{% raw %}```python
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## Несколько охранников

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

---

См. также: ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)