# Cuerpo de solicitud (modular)

Reciba cuerpos de solicitud JSON utilizando modelos Pydantic en controladores.

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

## Campo de cuerpo con `embed`

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

## Múltiples parámetros corporales

{% raw %}```python
"@Controller("/orders")
class OrderController:
    def post(self, item: Item, user: User):
        # Expects: {"item": {...}, "user": {...}}
        ...
```{% endraw %}

## Modelos anidados

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

FastAPI maneja la validación y devuelve 422 en caso de entrada no válida.

---

Ver también: [Controllers](/docs/modular/controllers), [FastAPI Request Body](/docs/fastapi/request-body)