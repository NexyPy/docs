# Request Body

Receive JSON request bodies using Pydantic models.

---

## Basic model
{% raw %}```python
---
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None

def POST(item: Item):
    return {"name": item.name, "price": item.price}
---
```{% endraw %}
{% raw %}```python
from pydantic import BaseModel
from nexy.decorators import Controller

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None

"@Controller("/items")
class ItemsController:
    def post(self, item: Item):
        return {"name": item.name, "price": item.price}
```{% endraw %}
## Body field with `embed`

Override the field name or inject extra JSON fields:
{% raw %}```python
---
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
---
```{% endraw %}
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
## Multiple body parameters

Pass several models — FastAPI nests them under their parameter names:
{% raw %}```python
---
def POST(item: Item, user: User):
    # Expects: {"item": {...}, "user": {...}}
    ...
---
```{% endraw %}
{% raw %}```python
"@Controller("/orders")
class OrderController:
    def post(self, item: Item, user: User):
        # Expects: {"item": {...}, "user": {...}}
        ...
```{% endraw %}
## Nested models

Models can contain other models, lists, and optional fields:
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
Router-agnostic — the same Pydantic models work in both FBR and Modular.

## Limitations

- Body is parsed automatically when you type-annotate a Pydantic model parameter
- FastAPI handles validation and returns 422 on invalid input
- No `"@Body()` decorator needed — standard FastAPI behaviour