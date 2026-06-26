# Request Body (FBR)

Receive JSON request bodies using Pydantic models.

## Basic model

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

## Body field with `embed`

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

## Multiple body parameters

{% raw %}```python
def POST(item: Item, user: User):
    # Expects: {"item": {...}, "user": {...}}
    ...
```{% endraw %}

## Nested models

Models can contain other models, lists, and optional fields.

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

The body is parsed automatically when you type-annotate a Pydantic model parameter. FastAPI handles validation and returns 422 on invalid input.

---

See also: [FastAPI Request Body](/docs/fastapi/request-body) for more details.