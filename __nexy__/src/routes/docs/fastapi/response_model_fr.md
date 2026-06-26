# Response Model

Control response serialisation, status codes, and response types.

---

## Pydantic response model
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
## List response
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
    ORJSONResponse,   # requires orjson
)
```{% endraw %}
### HTMLResponse
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
### StreamingResponse
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
## Direct Response with custom status
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

See ["@UseResponse](/docs/decorators/useresponse) for setting status codes in Modular controllers.