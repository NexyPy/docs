# 승인

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
---

## 경로의 가드
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
## 다수의 경비원
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
## Starlette의 `requires` 사용
{% raw %}```python
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}
FBR과 모듈러 모두에서 작동합니다. — `requires`는 유효한 가드 호출 가능 항목을 반환합니다.

---

## 관련

- ["@UseGuard reference](/docs/decorators/useguard) — 전체 데코레이터 API
- [Guards (Modular)](/docs/modular/guards) — 모듈형 DI에 가드 주입
- [Authentication](/docs/security/authentication) — 인증 백엔드 설정