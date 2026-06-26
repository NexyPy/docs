# リクエストボディ (モジュール式)

コントローラーで Pydantic モデルを使用して JSON リクエスト本文を受信します。

## 基本モデル

{% raw %}```python
from nexy.decorators import Controller
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None

"@Controller("/items")
class ItemsController:
    def post(self, item: Item):
        return {"name": item.name, "price": item.price}
```{% endraw %}

## `embed` の本文フィールド

{% raw %}```python
from fastapi import Body
from pydantic import BaseModel
from nexy.decorators import Controller

class Item(BaseModel):
    name: str
    price: float

"@Controller("/items")
class ItemsController:
    def post(self, item: Item, important: str = Body(embed=True)):
        # Expects: {"item": {...}, "important": "x"}
        ...
```{% endraw %}

## 複数のボディパラメータ

{% raw %}```python
"@Controller("/orders")
class OrderController:
    def post(self, item: Item, user: User):
        # Expects: {"item": {...}, "user": {...}}
        ...
```{% endraw %}

## ネストされたモデル

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

FastAPI は検証を処理し、無効な入力に対して 422 を返します。

---

関連項目: [Controllers](/docs/modular/controllers)、[FastAPI Request Body](/docs/fastapi/request-body)