# 响应模型 (FBR)

控制响应序列化、状态代码和响应类型。

## Pydantic 响应模型

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

## 列出响应

{% raw %}```python
def GET() -> list[UserOut]:
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
    ORJSONResponse,
)
```{% endraw %}

### HTML响应

{% raw %}```python
from fastapi.responses import HTMLResponse

def GET() -> HTMLResponse:
    return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}

### 流响应

{% raw %}```python
from fastapi.responses import StreamingResponse
import io

def GET() -> StreamingResponse:
    return StreamingResponse(io.StringIO("large CSV data..."), media_type="text/csv")
```{% endraw %}

## 直接响应自定义状态

{% raw %}```python
from fastapi.responses import JSONResponse

def GET() -> JSONResponse:
    return JSONResponse(
        content={"msg": "created"},
        status_code=201,
        headers={"X-Custom": "value"},
    )
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