# الترخيص (FBR)

قم بحماية المسارات باستخدام أدوات تزيين `"@UseGuard` مع استدعاءات الحراسة.

##عقد الحراسة

يمكن استدعاء الحارس بـ `__call__(self, request)`. ارفع `HTTPException` للحظر، وأرجع `None` للسماح.

{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}

## حراسة على الطريق

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

## استخدام `requires` الخاص بـ Starlette

{% raw %}```python
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## حراس متعددة

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

---

أنظر أيضا: ["@UseGuard reference](/docs/decorators/useguard)، [Authentication](/docs/security/authentication)