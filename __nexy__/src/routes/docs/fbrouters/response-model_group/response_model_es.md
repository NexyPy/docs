# Modelo de respuesta (FBR)

Controle la serialización de respuestas, códigos de estado y tipos de respuestas.

## Modelo de respuesta Pydantic

{% raw %}```python
# src/routes/users.py
from pydantic import BaseModel

class UserOut(BaseModel):
    id: int
    name: str
    email: str

def GET() -> UserOut:
    return UserOut(id=1, name="Alice", email="alice"@example.com")
```{% endraw %}

## Listar respuesta

{% raw %}```python
def GET() -> list[UserOut]:
    return [UserOut(id=1, name="Alice")]
```{% endraw %}

## Tipos de respuesta

Importar desde `fastapi.responses`:

{% raw %}```python
from fastapi.responses import (
    JSONResponse,
    HTMLResponse,
    PlainTextResponse,
    RedirectResponse,
    StreamingResponse,
    FileResponse,
    ORJSONResponse,
)
```{% endraw %}

### Respuesta HTML

{% raw %}```python
from fastapi.responses import HTMLResponse

def GET() -> HTMLResponse:
    return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}

### Respuesta de transmisión

{% raw %}```python
from fastapi.responses import StreamingResponse
import io

def GET() -> StreamingResponse:
    return StreamingResponse(io.StringIO("large CSV data..."), media_type="text/csv")
```{% endraw %}

## Respuesta directa con estado personalizado

{% raw %}```python
from fastapi.responses import JSONResponse

def GET() -> JSONResponse:
    return JSONResponse(
        content={"msg": "created"},
        status_code=201,
        headers={"X-Custom": "value"},
    )
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
| `ORJSONResponse` | `application/json` | JSON más rápido (necesita `orjson`) |