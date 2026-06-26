# ルート ハンドラー (API)

ルート ハンドラーは、API エンドポイントを公開する `src/routes/` の `.py` ファイルです。ページ (`.nexy` / `.mdx`) とは異なり、ハンドラーは JSON または生データを返します。

---

## ハンドラーの作成
{% raw %}```bash
routes/
└── api/
    └── hello.py           →  GET /api/hello
```{% endraw %}
{% raw %}```python
# api/hello.py
from fastapi import Request

async def GET(request: Request):
    return {"message": "Hello from Nexy!"}
```{% endraw %}

Nexy は、関数名を HTTP メソッド (`GET`、`POST`、`PUT`、`PATCH`、`DELETE`) にマップします。

---

## 使用可能な HTTP メソッド

単一ファイル内のメソッドごとに 1 つの関数を定義します。
{% raw %}```python
# routes/api/items.py
from fastapi import Request

async def GET(request: Request):
    return {"items": []}

async def POST(request: Request):
    data = await request.json()
    return {"created": data}

async def DELETE(request: Request, id: int):
    return {"deleted": id}
```{% endraw %}

各関数は、`/api/items` 上の `GET`、`POST`、`DELETE` に対応します。

---

## リクエスト本文
{% raw %}```python
# routes/api/users.py
from pydantic import BaseModel

class CreateUser(BaseModel):
    name: str
    email: str

async def POST(request: Request, body: CreateUser):
    return {"name": body.name, "email": body.email}
```{% endraw %}
FastAPI は本文を自動的に検証します。無効な入力の場合は 422 を返します。

---

## ステータスコード

`JSONResponse` を使用して `status_code` を返します。
{% raw %}```python
from fastapi.responses import JSONResponse

async def POST(request: Request):
    return JSONResponse({"created": True}, status_code=201)
```{% endraw %}
---

## ルートパラメータ
{% raw %}```python
# routes/api/users/[id].py
from fastapi import Request

async def GET(request: Request, id: int):
    return {"user_id": id}
```{% endraw %}
動的セグメント (`[id]`) は、自動型変換を使用してキーワード引数として挿入されます。

---

## 依存関係

FastAPI の `Depends`、`Header`、`Query`、`Cookie` はネイティブに動作します。
{% raw %}```python
from fastapi import Depends, Header, Query

def get_db():
    return {"connection": "ok"}

async def GET(request: Request, db=Depends(get_db), x_api_key: str = Header(None)):
    return {"db": db, "api_key": x_api_key}
```{% endraw %}
---

## 応答

|戻り値の型 |応答 |
|---------------|----------|
| `dict` | `application/json` |
| `list` | `application/json` |
| `str` | `text/plain` |
| `BaseModel` | `application/json` |
| `Response` |カスタム (任意) |
| `None` | `200 OK` 空 |

---

## ベストプラクティス

- 1 つの `.py` ファイル = 1 つのルート パス
- HTTP メソッドと一致する関数名を使用します (`GET`、`POST`、`PUT`、`PATCH`、`DELETE`)。
- リクエストの検証に Pydantic モデルを使用する
- カスタム ステータス コードには `JSONResponse` を使用します
- クライアントによってトリガーされる突然変異については、[Actions](/docs/guides/actions) を参照してください。