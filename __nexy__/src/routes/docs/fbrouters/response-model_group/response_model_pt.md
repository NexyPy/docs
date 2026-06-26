# Modelo de Resposta (FBR)

Controle a serialização de respostas, códigos de status e tipos de respostas.

## Modelo de resposta Pydantic

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

## Listar resposta

{% raw %}```python
def GET() -> list[UserOut]:
    return [UserOut(id=1, name="Alice")]
```{% endraw %}

## Tipos de resposta

Importar de `fastapi.responses`:

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

### HTMLResposta

{% raw %}```python
from fastapi.responses import HTMLResponse

def GET() -> HTMLResponse:
    return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}

### StreamingResposta

{% raw %}```python
from fastapi.responses import StreamingResponse
import io

def GET() -> StreamingResponse:
    return StreamingResponse(io.StringIO("large CSV data..."), media_type="text/csv")
```{% endraw %}

## Resposta direta com status personalizado

{% raw %}```python
from fastapi.responses import JSONResponse

def GET() -> JSONResponse:
    return JSONResponse(
        content={"msg": "created"},
        status_code=201,
        headers={"X-Custom": "value"},
    )
```{% endraw %}

## Tipos de resposta suportados

| Classe | Tipo de conteúdo | Caso de uso |
|-------|------------|----------|
| `JSONResponse` | `application/json` | Dados JSON (padrão) |
| `HTMLResponse` | `text/html` | Sequências HTML |
| `PlainTextResponse` | `text/plain` | Texto bruto |
| `RedirectResponse` | — | Redirecionamentos |
| `StreamingResponse` | varia | Transmitir dados |
| `FileResponse` | varia | Downloads de arquivos |
| `ORJSONResponse` | `application/json` | JSON mais rápido (precisa de `orjson`) |