# Response Model (FBR)

Control response serialisation, status codes, and response types.

## Pydantic response model

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

## List response

{% raw %}```python
def GET() -> list[UserOut]:
    return [UserOut(id=1, name="Alice")]
```{% endraw %}

## Response types

Import from `fastapi.responses`:

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

## Direct Response with custom status

{% raw %}```python
from fastapi.responses import JSONResponse

def GET() -> JSONResponse:
    return JSONResponse(
        content={"msg": "created"},
        status_code=201,
        headers={"X-Custom": "value"},
    )
```{% endraw %}

## Supported response types

| Class | Content-Type | Use case |
|-------|-------------|----------|
| `JSONResponse` | `application/json` | JSON data (default) |
| `HTMLResponse` | `text/html` | HTML strings |
| `PlainTextResponse` | `text/plain` | Raw text |
| `RedirectResponse` | — | Redirects |
| `StreamingResponse` | varies | Stream data |
| `FileResponse` | varies | File downloads |
| `ORJSONResponse` | `application/json` | Faster JSON (needs `orjson`) |