# "@ミドルウェア

ミドルウェア呼び出し可能オブジェクトをコントローラー クラスまたはハンドラー メソッドに適用します。

## ミドルウェア契約

ミドルウェアは、`__call__(self, request)` で呼び出し可能です。 FastAPI `Request` オブジェクトを受け取り、ハンドラーの前に実行されます。
{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}
---

## ルート上のミドルウェア
{% raw %}```python
---
from nexy.decorators import Middleware

class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")

"@Middleware(LoggingMiddleware())
def GET():
    ...
---
```{% endraw %}
{% raw %}```python
from nexy.decorators import Middleware, Controller

"@Controller("/users")
"@Middleware(LoggingMiddleware())
class UsersController:
    def GET(self) -> list[dict]:
        ...
```{% endraw %}
## 複数のミドルウェア
{% raw %}```python
---
from nexy.decorators import Middleware

class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")

class TimerMiddleware:
    def __call__(self, request) -> None:
        print("timing")

"@Middleware(LoggingMiddleware(), TimerMiddleware())
def GET():
    ...
---
```{% endraw %}
{% raw %}```python
"@Middleware(LoggingMiddleware(), TimerMiddleware())
class UsersController:
    def GET(self):
        ...
```{% endraw %}
＃＃ サイン
{% raw %}```python
Middleware(*middlewares: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}
## ガード対ミドルウェア

| |警備員 |ミドルウェア |
|---|--------|----------|
|目的 |認可 |副作用 (ロギング、タイミング) |
|リクエストをブロック |はい (HTTPException が発生します) |いいえ (レイズしない限り) |
| | として実行します。 FastAPI `Depends` |高速API `Depends` |
|注文 |クラスガード → メソッドガード |クラスミドルウェア → メソッドミドルウェア |

どちらも FastAPI `Depends` 依存関係として実行されます。順序: クラス ガード → クラス ミドルウェア → メソッド ガード → メソッド ミドルウェア。