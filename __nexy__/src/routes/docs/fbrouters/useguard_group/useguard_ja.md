# "@UseGuard (FBR)

ガード呼び出し可能オブジェクトをルート関数に適用します。

## ガード契約

ガードは、`__call__(self, request)` で呼び出すことができます。ブロックするには `HTTPException` を上げ、許可するには `None` を返します。

{% raw %}```python
from fastapi import HTTPException

class RoleGuard:
    def __init__(self, role: str):
        self.role = role

    def __call__(self, request) -> None:
        if request.user.role != self.role:
            raise HTTPException(403)
```{% endraw %}

## 関数のガード

{% raw %}```python
from nexy.decorators import UseGuard

class AuthGuard:
    def __call__(self, request):
        if not request.user:
            raise HTTPException(401)

"@UseGuard(AuthGuard())
def GET():
    ...
```{% endraw %}

## 複数のガード

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

＃＃ サイン

{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

ガードは FastAPI `Depends` として実行されます。ガードは `Request` オブジェクトを受け取り、`HTTPException` を呼び出すことでブロックできます。

---

関連項目: [Authorization](/docs/fbrouters/authorization)、["@UseGuard reference](/docs/decorators/useguard)