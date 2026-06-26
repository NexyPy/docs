# Réponse (Modulaire)

Sérialisation des réponses de contrôle, codes d’état et types de réponses dans les contrôleurs.

## Modèle de réponse pydantique

{% raw %}```python
from nexy.decorators import Controller
from pydantic import BaseModel

class UserOut(BaseModel):
    id: int
    name: str
    email: str

"@Controller("/users")
class UsersController:
    def GET(self) -> list[UserOut]:
        return [UserOut(id=1, name="Alice", email="alice"@example.com")]
```{% endraw %}

## Liste des réponses

{% raw %}```python
"@Controller("/users")
class UsersController:
    def GET(self) -> list[UserOut]:
        return [UserOut(id=1, name="Alice")]
```{% endraw %}

## HTMLRéponse

{% raw %}```python
from fastapi.responses import HTMLResponse
from nexy.decorators import Controller

"@Controller("/page")
class PageController:
    def GET(self) -> HTMLResponse:
        return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}

## Réponse en streaming

{% raw %}```python
from fastapi.responses import StreamingResponse
from nexy.decorators import Controller
import io

"@Controller("/export")
class ExportController:
    def GET(self) -> StreamingResponse:
        return StreamingResponse(io.StringIO("data..."), media_type="text/csv")
```{% endraw %}

## Réponse directe avec statut personnalisé

{% raw %}```python
from fastapi.responses import JSONResponse
from nexy.decorators import Controller, UseResponse

"@Controller("/items")
class ItemsController:
    "@UseResponse(status_code=201)
    def post(self, item: Item):
        return {"created": True}
```{% endraw %}

## Types de réponses pris en charge

| Classe | Type de contenu | Cas d'utilisation |
|-------|-------------|--------------|
| `JSONResponse` | `application/json` | Données JSON (par défaut) |
| `HTMLResponse` | `text/html` | Chaînes HTML |
| `PlainTextResponse` | `text/plain` | Texte brut |
| `RedirectResponse` | — | Redirections |
| `StreamingResponse` | varie | Flux de données |
| `FileResponse` | varie | Téléchargements de fichiers |

Voir ["@UseResponse](/docs/decorators/useresponse) pour les options de code d'état.