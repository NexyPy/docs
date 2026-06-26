# 認可

ガード呼び出し可能な `"@UseGuard` デコレータを使用してルートを保護します。

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
---

## ルート上のガード
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
## 複数のガード
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
## Starlette の `requires` を使用
{% raw %}```python
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}
FBR とモジュラーの両方で動作します。`requires` は有効なガード呼び出し可能オブジェクトを返します。

---

## 関連

- ["@UseGuard reference](/docs/decorators/useguard) — 完全なデコレータ API
- [Guards (Modular)](/docs/modular/guards) — モジュラー DI でのガード インジェクション
- [Authentication](/docs/security/authentication) — 認証バックエンドのセットアップ