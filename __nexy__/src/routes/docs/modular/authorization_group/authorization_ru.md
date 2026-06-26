# Охрана и авторизация (модульная)

Защитите контроллеры и маршруты, используя `"@UseGuard` с вызываемыми объектами защиты.

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

## Защита на уровне контроллера

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

## Несколько охранников

{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}

Охранники на уровне класса выполняются раньше, чем меры защиты на уровне метода. Все запускаются как FastAPI `Depends`.

## Защита на уровне метода

{% raw %}```python
from nexy.decorators import Controller, UseGuard

"@Controller("/users")
class UsersController:
    "@UseGuard(AuthGuard())
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

Работает как на уровне контроллера, так и на уровне метода.

---

См. также: [Guards](/docs/modular/guards), ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)