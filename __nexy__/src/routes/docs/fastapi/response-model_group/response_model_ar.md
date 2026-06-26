#نموذج الاستجابة

التحكم في تسلسل الاستجابة ورموز الحالة وأنواع الاستجابة.

---

## نموذج الاستجابة Pydantic
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
## قائمة الاستجابة
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
## أنواع الاستجابة

الاستيراد من `fastapi.responses`:
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
### استجابة HTML
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
### استجابة البث
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
## الاستجابة المباشرة مع الحالة المخصصة
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
## أنواع الاستجابة المدعومة

| فئة | نوع المحتوى | حالة الاستخدام |
|-------|------------|----------|
| `JSONResponse` | `application/json` | بيانات JSON (افتراضي) |
| `HTMLResponse` | `text/html` | سلاسل HTML |
| `PlainTextResponse` | `text/plain` | نص خام |
| `RedirectResponse` | — | عمليات إعادة التوجيه |
| `StreamingResponse` | يختلف | دفق البيانات |
| `FileResponse` | يختلف | تنزيلات الملفات |
| `ORJSONResponse` | `application/json` | أسرع JSON (يحتاج إلى `orjson`) |

راجع ["@UseResponse](/docs/decorators/useresponse) لتعيين رموز الحالة في وحدات التحكم المعيارية.