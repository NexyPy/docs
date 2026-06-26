# الحراس والتفويض (معياري)

قم بحماية وحدات التحكم والمسارات باستخدام `"@UseGuard` مع استدعاءات الحراسة.

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

## حارس على مستوى وحدة التحكم

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

## حراس متعددة

{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}

يعمل حراس مستوى الفصل قبل حراس مستوى الطريقة. تعمل جميعها كـ FastAPI `Depends`.

## حارس على مستوى الطريقة

{% raw %}```python
from nexy.decorators import Controller, UseGuard

"@Controller("/users")
class UsersController:
    "@UseGuard(AuthGuard())
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

يعمل على مستوى وحدة التحكم والطريقة.

---

أنظر أيضا: [Guards](/docs/modular/guards)، ["@UseGuard reference](/docs/decorators/useguard)، [Authentication](/docs/security/authentication)