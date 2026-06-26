# "@UseGuard (FBR)

Wenden Sie aufrufbare Schutzfunktionen auf eine Routenfunktion an.

## Wachvertrag

Ein Wächter kann mit `__call__(self, request)` aufgerufen werden. Erhöhen Sie `HTTPException` zum Blockieren, geben Sie `None` zurück, um es zuzulassen.

{% raw %}```python
from fastapi import HTTPException

class RoleGuard:
    def __init__(self, role: str):
        self.role = role

    def __call__(self, request) -> None:
        if request.user.role != self.role:
            raise HTTPException(403)
```{% endraw %}

## Eine Funktion schützen

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

## Mehrere Wachen

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

## Unterschrift

{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

Guards laufen als FastAPI `Depends` – sie empfangen das `Request`-Objekt und können blockieren, indem sie `HTTPException` erhöhen.

---

Siehe auch: [Authorization](/docs/fbrouters/authorization), ["@UseGuard reference](/docs/decorators/useguard)