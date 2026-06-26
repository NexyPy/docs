# "@UseGuard (FBR)

Apply guard callables to a route function.

## Guard contract

A guard is any callable with `__call__(self, request)`. Raise `HTTPException` to block, return `None` to allow.

{% raw %}```python
from fastapi import HTTPException

class RoleGuard:
    def __init__(self, role: str):
        self.role = role

    def __call__(self, request) -> None:
        if request.user.role != self.role:
            raise HTTPException(403)
```{% endraw %}

## Guard on a function

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

## Multiple guards

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

## Signature

{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

Guards run as FastAPI `Depends` — they receive the `Request` object and can block by raising `HTTPException`.

---

See also: [Authorization](/docs/fbrouters/authorization), ["@UseGuard reference](/docs/decorators/useguard)