# ガードと認可 (モジュール式)

ガード呼び出し可能関数で `"@UseGuard` を使用してコントローラーとルートを保護します。

## ガード契約

ガードは、`__call__(self, request)` で呼び出すことができます。ブロックするには `HTTPException` を上げ、許可するには `None` を返します。

{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}

## コントローラーレベルのガード

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

## 複数のガード

{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}

クラス レベルのガードはメソッド レベルのガードより前に実行されます。すべて FastAPI `Depends` として実行されます。

## メソッドレベルのガード

{% raw %}```python
from nexy.decorators import Controller, UseGuard

"@Controller("/users")
class UsersController:
    "@UseGuard(AuthGuard())
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

コントローラー レベルとメソッド レベルの両方で機能します。

---

関連項目: [Guards](/docs/modular/guards)、["@UseGuard reference](/docs/decorators/useguard)、[Authentication](/docs/security/authentication)