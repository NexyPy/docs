# "@UseGuard (FBR)

Appliquez des éléments appelables de garde à une fonction d'itinéraire.

## Contrat de garde

Un garde peut être appelé avec `__call__(self, request)`. Augmentez `HTTPException` pour bloquer, renvoyez `None` pour autoriser.

{% raw %}```python
from fastapi import HTTPException

class RoleGuard:
    def __init__(self, role: str):
        self.role = role

    def __call__(self, request) -> None:
        if request.user.role != self.role:
            raise HTTPException(403)
```{% endraw %}

## Garde sur une fonction

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

## Plusieurs gardes

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

Les gardes s'exécutent en tant que FastAPI `Depends` : ils reçoivent l'objet `Request` et peuvent bloquer en augmentant `HTTPException`.

---

Voir aussi : [Authorization](/docs/fbrouters/authorization), ["@UseGuard reference](/docs/decorators/useguard)