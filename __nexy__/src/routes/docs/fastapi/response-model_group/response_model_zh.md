# 响应模型

控制响应序列化、状态代码和响应类型。

---

## Pydantic 响应模型
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
## 列出响应
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
## 响应类型

从 `fastapi.responses` 导入：
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
### HTML响应
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
### 流响应
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
## 直接响应自定义状态
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
## 支持的响应类型

|班级 |内容类型 |使用案例 |
|--------|-------------|----------|
| `JSONResponse` | `application/json` | JSON 数据（默认）|
| `HTMLResponse` | `text/html` | HTML 字符串 |
| `PlainTextResponse` | `text/plain` |原始文本|
| `RedirectResponse` | — |重定向 |
| `StreamingResponse` |变化 |流数据 |
| `FileResponse` |变化 |文件下载|
| `ORJSONResponse` | `application/json` |更快的 JSON（需要 `orjson`）|

有关在模块化控制器中设置状态代码的信息，请参阅 ["@UseResponse](/docs/decorators/useresponse)。