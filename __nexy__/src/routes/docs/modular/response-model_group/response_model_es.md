# Respuesta (Modular)

Serialización de respuestas de control, códigos de estado y tipos de respuestas en controladores.

## Modelo de respuesta Pydantic

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

## Listar respuesta

{% raw %}```python
"@Controller("/users")
class UsersController:
    def GET(self) -> list[UserOut]:
        return [UserOut(id=1, name="Alice")]
```{% endraw %}

## Respuesta HTML

{% raw %}```python
from fastapi.responses import HTMLResponse
from nexy.decorators import Controller

"@Controller("/page")
class PageController:
    def GET(self) -> HTMLResponse:
        return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}

## Respuesta de transmisión

{% raw %}```python
from fastapi.responses import StreamingResponse
from nexy.decorators import Controller
import io

"@Controller("/export")
class ExportController:
    def GET(self) -> StreamingResponse:
        return StreamingResponse(io.StringIO("data..."), media_type="text/csv")
```{% endraw %}

## Respuesta directa con estado personalizado

{% raw %}```python
from fastapi.responses import JSONResponse
from nexy.decorators import Controller, UseResponse

"@Controller("/items")
class ItemsController:
    "@UseResponse(status_code=201)
    def post(self, item: Item):
        return {"created": True}
```{% endraw %}

## Tipos de respuesta admitidos

| Clase | Tipo de contenido | Caso de uso |
|-------|-------------|----------|
| `JSONResponse` | `application/json` | Datos JSON (predeterminado) |
| `HTMLResponse` | `text/html` | Cadenas HTML |
| `PlainTextResponse` | `text/plain` | Texto sin formato |
| `RedirectResponse` | — | Redirecciones |
| `StreamingResponse` | varía | Datos de flujo |
| `FileResponse` | varía | Descargas de archivos |

Consulte ["@UseResponse](/docs/decorators/useresponse) para conocer las opciones de códigos de estado.