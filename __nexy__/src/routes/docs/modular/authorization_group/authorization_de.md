# Schutz und Autorisierung (modular)

Schützen Sie Controller und Routen mit `"@UseGuard` mit Guard Callables.

## Wachvertrag

Ein Wächter kann mit `__call__(self, request)` aufgerufen werden. Erhöhen Sie `HTTPException` zum Blockieren, geben Sie `None` zurück, um es zuzulassen.

{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}

## Schutz auf Controller-Ebene

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

## Mehrere Wachen

{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}

Wächter auf Klassenebene werden vor Wächtern auf Methodenebene ausgeführt. Alle laufen als FastAPI `Depends`.

## Schutz auf Methodenebene

{% raw %}```python
from nexy.decorators import Controller, UseGuard

"@Controller("/users")
class UsersController:
    "@UseGuard(AuthGuard())
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

Funktioniert sowohl auf Controller- als auch auf Methodenebene.

---

Siehe auch: [Guards](/docs/modular/guards), ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)