# Corpo da solicitação (modular)

Receba corpos de solicitação JSON usando modelos Pydantic em controladores.

## Modelo básico

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

## Campo de corpo com `embed`

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

## Vários parâmetros corporais

{% raw %}```python
"@Controller("/orders")
class OrderController:
    def post(self, item: Item, user: User):
        # Expects: {"item": {...}, "user": {...}}
        ...
```{% endraw %}

## Modelos aninhados

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

FastAPI lida com a validação e retorna 422 em entradas inválidas.

---

Veja também: [Controllers](/docs/modular/controllers), [FastAPI Request Body](/docs/fastapi/request-body)