# "@ミドルウェア (FBR)

ミドルウェア呼び出し可能ファイルをルート関数に適用します。

## ミドルウェア契約

ミドルウェアは、`__call__(self, request)` で呼び出し可能です。 FastAPI `Request` オブジェクトを受け取り、ハンドラーの前に実行されます。

{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}

## 関数のミドルウェア

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware())
def GET():
    ...
```{% endraw %}

## 複数のミドルウェア

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware(), TimerMiddleware())
def GET():
    ...
```{% endraw %}

＃＃ サイン

{% raw %}```python
Middleware(*middlewares: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

ミドルウェアは FastAPI `Depends` として実行されます。これはハンドラーの前に実行されます。ガードとは異なり、ミドルウェアは副作用 (ロギング、タイミング) を目的としており、リクエストをブロックするためのものではありません (ただし、`HTTPException` が発生する可能性があります)。

---

関連項目: [Middlewares](/docs/fbrouters/middlewares)、["@Middleware reference](/docs/decorators/middleware)