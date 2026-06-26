# ミドルウェア

ミドルウェアは、すべてのリクエストの前後に実行されるレイヤーであり、ロギング、認証、CORS ヘッダー、その他のグローバルな懸念に役立ちます。

---

## ミドルウェアの作成

Nexy では、ミドルウェアは Starlette の `BaseHTTPMiddleware` を介して、または呼び出し可能として定義されます。
{% raw %}```python
# src/middlewares.py
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print(f"→ {request.method} {request.url.path}")
        response = await call_next(request)
        print(f"← {response.status_code}")
        return response
```{% endraw %}
---

## ミドルウェアの登録

`nexyconfig.py` で、`(MiddlewareClass, kwargs_dict)` タプルのリストを渡します。
{% raw %}```python
from nexy.core.models import NexyConfigModel
from src.middlewares import LoggingMiddleware

class NexyConfig(NexyConfigModel):
    useMiddlewares = [
        (LoggingMiddleware, {}),
    ]
```{% endraw %}
---

## 実行順序

ミドルウェアは宣言順に実行され、**スタック** (Starlette など) を形成します。
{% raw %}```text
Request → MW1 → MW2 → Route → MW2 → MW1 → Response
```{% endraw %}
---

## ディレクトリレベルのミドルウェア (FBR)

FBR を使用すると、ディレクトリ内の `dependencies.py` にミドルウェア ロジックを配置できます。
{% raw %}```python
# routes/api/dependencies.py
from fastapi import Request

async def verify_api_key(request: Request):
    if request.headers.get("X-API-Key") != "secret":
        from fastapi import HTTPException
        raise HTTPException(status_code=403)
```{% endraw %}
`/api/` の下のすべてのページは、このチェックを自動的に継承します。
{% call Link(href="/docs/fbrouters/route_handlers") %}Next: Route Handlers →{% endcall %}