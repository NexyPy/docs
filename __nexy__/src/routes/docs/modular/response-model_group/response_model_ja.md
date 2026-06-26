# 応答 (モジュール式)

コントローラーでの応答のシリアル化、ステータス コード、および応答タイプを制御します。

## ピダンティックな応答モデル

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

## リスト応答

{% raw %}```python
"@Controller("/users")
class UsersController:
    def GET(self) -> list[UserOut]:
        return [UserOut(id=1, name="Alice")]
```{% endraw %}

## HTMLレスポンス

{% raw %}```python
from fastapi.responses import HTMLResponse
from nexy.decorators import Controller

"@Controller("/page")
class PageController:
    def GET(self) -> HTMLResponse:
        return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}

## ストリーミング応答

{% raw %}```python
from fastapi.responses import StreamingResponse
from nexy.decorators import Controller
import io

"@Controller("/export")
class ExportController:
    def GET(self) -> StreamingResponse:
        return StreamingResponse(io.StringIO("data..."), media_type="text/csv")
```{% endraw %}

## カスタム ステータスを使用したダイレクト レスポンス

{% raw %}```python
from fastapi.responses import JSONResponse
from nexy.decorators import Controller, UseResponse

"@Controller("/items")
class ItemsController:
    "@UseResponse(status_code=201)
    def post(self, item: Item):
        return {"created": True}
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

ステータス コードのオプションについては、["@UseResponse](/docs/decorators/useresponse) を参照してください。