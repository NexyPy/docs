# "@UseGuard

ガード呼び出し可能オブジェクトをコントローラー クラスまたは個々のハンドラー メソッドに適用します。

## ガード契約

ガードは、`__call__(self, request)` で呼び出すことができます。 FastAPI `Request` オブジェクトを受け取ります。ブロックするには `HTTPException` を上げ、許可するには `None` を返します。
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

## ルート上のガード
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
## 複数のガード
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
＃＃ サイン
{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}
## 注文

クラス レベルのガードはメソッド レベルのガードより前に実行されます。すべて FastAPI `Depends` として実行されます。