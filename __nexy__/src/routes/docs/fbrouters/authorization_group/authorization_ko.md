# 승인(FBR)

가드 호출 가능 항목이 있는 `"@UseGuard` 데코레이터를 사용하여 경로를 보호합니다.

## 경비 계약

가드는 `__call__(self, request)`로 호출할 수 있습니다. 차단하려면 `HTTPException`를 올리고 허용하려면 `None`를 반환합니다.

{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}

## 경로의 가드

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

## Starlette의 `requires` 사용

{% raw %}```python
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## 다수의 경비원

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

---

참조: ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)