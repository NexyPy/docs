# Reaktionsmodell (FBR)

Steuern Sie die Serialisierung von Antworten, Statuscodes und Antworttypen.

## Pydantisches Reaktionsmodell

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

## Antwort auflisten

{% raw %}```python
def GET() -> list[UserOut]:
    return [UserOut(id=1, name="Alice")]
```{% endraw %}

## Antworttypen

Import aus `fastapi.responses`:

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

### HTMLResponse

{% raw %}```python
from fastapi.responses import HTMLResponse

def GET() -> HTMLResponse:
    return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}

### StreamingResponse

{% raw %}```python
from fastapi.responses import StreamingResponse
import io

def GET() -> StreamingResponse:
    return StreamingResponse(io.StringIO("large CSV data..."), media_type="text/csv")
```{% endraw %}

## Direkte Antwort mit benutzerdefiniertem Status

{% raw %}```python
from fastapi.responses import JSONResponse

def GET() -> JSONResponse:
    return JSONResponse(
        content={"msg": "created"},
        status_code=201,
        headers={"X-Custom": "value"},
    )
```{% endraw %}

## Unterstützte Antworttypen

| Klasse | Inhaltstyp | Anwendungsfall |
|-------|-------------|----------|
| `JSONResponse` | `application/json` | JSON-Daten (Standard) |
| `HTMLResponse` | `text/html` | HTML-Strings |
| `PlainTextResponse` | `text/plain` | Rohtext |
| `RedirectResponse` | — | Weiterleitungen |
| `StreamingResponse` | variiert | Streamdaten |
| `FileResponse` | variiert | Datei-Downloads |
| `ORJSONResponse` | `application/json` | Schnelleres JSON (benötigt `orjson`) |