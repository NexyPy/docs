#التفويض

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
---

## حراسة على الطريق
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
## حراس متعددة
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
## استخدام `requires` من Starlette
{% raw %}```python
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}
يعمل في كل من FBR وModular — `requires` يُرجع حارس صالح قابل للاستدعاء.

---

## ذات صلة

- ["@UseGuard reference](/docs/decorators/useguard) — واجهة برمجة تطبيقات الديكور الكاملة
- [Guards (Modular)](/docs/modular/guards) — الحقن الواقي في Modular DI
- [Authentication](/docs/security/authentication) — إعداد الواجهات الخلفية للمصادقة