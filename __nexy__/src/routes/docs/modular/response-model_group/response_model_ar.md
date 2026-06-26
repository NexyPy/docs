# الاستجابة (وحدات)

التحكم في تسلسل الاستجابة ورموز الحالة وأنواع الاستجابة في وحدات التحكم.

## نموذج الاستجابة Pydantic

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

## قائمة الاستجابة

{% raw %}```python
"@Controller("/users")
class UsersController:
    def GET(self) -> list[UserOut]:
        return [UserOut(id=1, name="Alice")]
```{% endraw %}

## استجابة HTML

{% raw %}```python
from fastapi.responses import HTMLResponse
from nexy.decorators import Controller

"@Controller("/page")
class PageController:
    def GET(self) -> HTMLResponse:
        return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}

## استجابة البث

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

راجع ["@UseResponse](/docs/decorators/useresponse) للتعرف على خيارات رمز الحالة.