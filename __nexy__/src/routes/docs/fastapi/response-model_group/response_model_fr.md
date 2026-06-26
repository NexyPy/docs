# Modèle de réponse

Contrôlez la sérialisation des réponses, les codes d’état et les types de réponses.

---

## Modèle de réponse pydantique
{% raw %}```python
---
from pydantic import BaseModel

class UserOut(BaseModel):
    id: int
    name: str
    email: str

def GET() -> UserOut:
    return UserOut(id=1, name="Alice", email="alice"@example.com")
---
```{% endraw %}
{% raw %}```python
from pydantic import BaseModel
from nexy.decorators import Controller

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
---
def GET() -> list[UserOut]:
    return [UserOut(id=1, name="Alice")]
---
```{% endraw %}
{% raw %}```python
"@Controller("/users")
class UsersController:
    def GET(self) -> list[UserOut]:
        return [UserOut(id=1, name="Alice")]
```{% endraw %}
## Types de réponses

Importer depuis `fastapi.responses` :
{% raw %}```python
from fastapi.responses import (
    JSONResponse,
    HTMLResponse,
    PlainTextResponse,
    RedirectResponse,
    StreamingResponse,
    FileResponse,
    ORJSONResponse,   # requires orjson
)
```{% endraw %}
### HTMLRéponse
{% raw %}```python
---
from fastapi.responses import HTMLResponse

def GET() -> HTMLResponse:
    return HTMLResponse("<h1>Hello</h1>")
---
```{% endraw %}
{% raw %}```python
from fastapi.responses import HTMLResponse
from nexy.decorators import Controller

"@Controller("/page")
class PageController:
    def GET(self) -> HTMLResponse:
        return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}
### Réponse en streaming
{% raw %}```python
---
from fastapi.responses import StreamingResponse
import io

def GET() -> StreamingResponse:
    return StreamingResponse(io.StringIO("large CSV data..."), media_type="text/csv")
---
```{% endraw %}
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
---
from fastapi.responses import JSONResponse

def GET() -> JSONResponse:
    return JSONResponse(
        content={"msg": "created"},
        status_code=201,
        headers={"X-Custom": "value"},
    )
---
```{% endraw %}
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
| `ORJSONResponse` | `application/json` | JSON plus rapide (nécessite `orjson`) |

Voir ["@UseResponse](/docs/decorators/useresponse) pour définir les codes d'état dans les contrôleurs modulaires.