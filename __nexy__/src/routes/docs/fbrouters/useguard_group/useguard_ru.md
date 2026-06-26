# "@UseGuard (FBR)

Примените вызываемые защитные функции к функции маршрута.

## Контракт охраны

Охранником является любой объект, вызываемый с помощью `__call__(self, request)`. Поднимите `HTTPException`, чтобы заблокировать, верните `None`, чтобы разрешить.

{% raw %}```python
from fastapi import HTTPException

class RoleGuard:
    def __init__(self, role: str):
        self.role = role

    def __call__(self, request) -> None:
        if request.user.role != self.role:
            raise HTTPException(403)
```{% endraw %}

## Защита функции

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

## Несколько охранников

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

## Подпись

{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

Охранники работают как FastAPI `Depends` — они получают объект `Request` и могут блокировать, поднимая `HTTPException`.

---

См. также: [Authorization](/docs/fbrouters/authorization), ["@UseGuard reference](/docs/decorators/useguard)