#“@UseGuard (FBR)

将守卫可调用对象应用于路由函数。

## 守卫合同

守卫可以用 `__call__(self, request)` 调用。提高 `HTTPException` 阻止，返回 `None` 允许。

{% raw %}```python
from fastapi import HTTPException

class RoleGuard:
    def __init__(self, role: str):
        self.role = role

    def __call__(self, request) -> None:
        if request.user.role != self.role:
            raise HTTPException(403)
```{% endraw %}

## 保护函数

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

## 多个守卫

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

＃＃ 签名

{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

守卫作为 FastAPI `Depends` 运行 — 它们接收 `Request` 对象，并可以通过提高 `HTTPException` 来阻止。

---

另请参阅：[Authorization](/docs/fbrouters/authorization)、["@UseGuard reference](/docs/decorators/useguard)