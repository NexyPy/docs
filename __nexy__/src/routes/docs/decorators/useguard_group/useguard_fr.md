# "@UseGuard

Appliquez des callables de garde à une classe de contrôleur ou à une méthode de gestionnaire individuel.

## Contrat de garde

Un garde peut être appelé avec `__call__(self, request)`. Il reçoit l'objet FastAPI `Request`. Augmentez `HTTPException` pour bloquer, renvoyez `None` pour autoriser.
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

## Garde sur un itinéraire
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
## Plusieurs gardes
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
## Signature
{% raw %}```python
UseGuard(*guards: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}
## Commande

Les gardes au niveau de la classe courent avant les gardes au niveau de la méthode. Tous fonctionnent en tant que FastAPI `Depends`.