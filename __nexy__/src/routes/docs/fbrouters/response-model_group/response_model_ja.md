# 応答モデル (FBR)

応答のシリアル化、ステータス コード、および応答タイプを制御します。

## ピダンティックな応答モデル

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

## リスト応答

{% raw %}```python
def GET() -> list[UserOut]:
    return [UserOut(id=1, name="Alice")]
```{% endraw %}

## 応答タイプ

`fastapi.responses` からインポート:

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

### HTMLレスポンス

{% raw %}```python
from fastapi.responses import HTMLResponse

def GET() -> HTMLResponse:
    return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}

### ストリーミング応答

{% raw %}```python
from fastapi.responses import StreamingResponse
import io

def GET() -> StreamingResponse:
    return StreamingResponse(io.StringIO("large CSV data..."), media_type="text/csv")
```{% endraw %}

## カスタム ステータスを使用したダイレクト レスポンス

{% raw %}```python
from fastapi.responses import JSONResponse

def GET() -> JSONResponse:
    return JSONResponse(
        content={"msg": "created"},
        status_code=201,
        headers={"X-Custom": "value"},
    )
```{% endraw %}

## サポートされている応答タイプ

|クラス |コンテンツタイプ |使用例 |
|----------|---------------|----------|
| `JSONResponse` | `application/json` | JSON データ (デフォルト) |
| `HTMLResponse` | `text/html` | HTML文字列 |
| `PlainTextResponse` | `text/plain` |生のテキスト |
| `RedirectResponse` | — |リダイレクト |
| `StreamingResponse` |さまざまです |ストリームデータ |
| `FileResponse` |さまざまです |ファイルのダウンロード |
| `ORJSONResponse` | `application/json` | JSON の高速化 (`orjson` が必要) |