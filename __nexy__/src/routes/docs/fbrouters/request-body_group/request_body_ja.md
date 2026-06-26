# リクエストボディ(FBR)

Pydantic モデルを使用して JSON リクエスト本文を受信します。

## 基本モデル

{% raw %}```python
# src/routes/items.py
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None

def POST(item: Item):
    return {"name": item.name, "price": item.price}
```{% endraw %}

## `embed` の本文フィールド

{% raw %}```python
from fastapi import Body
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float

def POST(
    item: Item,
    important: str = Body(embed=True),
):
    # Expects: {"item": {...}, "important": "x"}
    ...
```{% endraw %}

## 複数のボディパラメータ

{% raw %}```python
def POST(item: Item, user: User):
    # Expects: {"item": {...}, "user": {...}}
    ...
```{% endraw %}

## ネストされたモデル

モデルには、他のモデル、リスト、およびオプションのフィールドを含めることができます。

{% raw %}```python
from pydantic import BaseModel

class Image(BaseModel):
    url: str
    alt: str | None = None

class Item(BaseModel):
    name: str
    tags: list[str] = []
    image: Image | None = None
```{% endraw %}

Pydantic モデルのパラメーターに型アノテーションを付けると、本体が自動的に解析されます。 FastAPI は検証を処理し、無効な入力に対して 422 を返します。

---

詳細については、「[FastAPI Request Body](/docs/fastapi/request-body)」も参照してください。