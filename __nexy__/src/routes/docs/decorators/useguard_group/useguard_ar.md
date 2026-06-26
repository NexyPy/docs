# "@UseGuard

قم بتطبيق استدعاءات الحراسة على فئة وحدة التحكم أو أسلوب المعالج الفردي.

##عقد الحراسة

يمكن استدعاء الحارس بـ `__call__(self, request)`. يتلقى كائن FastAPI `Request`. ارفع `HTTPException` للحظر، وأرجع `None` للسماح.
{% raw %}```python
from fastapi import HTTPException

class RoleGuard:
    def __init__(self, role: str):
        self.role = role

    def __call__(self, request) -> None:
        if request.user.role != self.role:
            raise HTTPException(403)
```{% endraw %}
---

## حراسة على الطريق
{% raw %}```python
---
from nexy.decorators import UseGuard

class AuthGuard:
    def __call__(self, request):
        if not request.user:
            raise HTTPException(401)

"@UseGuard(AuthGuard())
def GET():
    ...
---
```{% endraw %}
{% raw %}```python
from nexy.decorators import UseGuard, Controller

class AuthGuard:
    def __call__(self, request):
        if not request.user:
            raise HTTPException(401)

"@Controller("/users")
"@UseGuard(AuthGuard())
class UsersController:
    def GET(self) -> list[dict]:
        ...

    "@UseGuard(AdminGuard())
    def delete(self, user_id: int) -> dict:
        ...
```{% endraw %}
## حراس متعددة
{% raw %}```python
---
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
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
## إمضاء
{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}
## الطلب

يعمل حراس مستوى الفصل قبل حراس مستوى الطريقة. تعمل جميعها كـ FastAPI `Depends`.