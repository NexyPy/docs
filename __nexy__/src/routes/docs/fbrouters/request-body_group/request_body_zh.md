# 请求正文 (FBR)

使用 Pydantic 模型接收 JSON 请求正文。

## 基本模型

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

## 正文字段带有 `embed`

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

## 多个身体参数

{% raw %}```python
def POST(item: Item, user: User):
    # Expects: {"item": {...}, "user": {...}}
    ...
```{% endraw %}

## 嵌套模型

模型可以包含其他模型、列表和可选字段。

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

当您对 Pydantic 模型参数进行类型注释时，主体会自动解析。 FastAPI 处理验证并在无效输入时返回 422。

---

另请参阅：[FastAPI Request Body](/docs/fastapi/request-body) 了解更多详细信息。