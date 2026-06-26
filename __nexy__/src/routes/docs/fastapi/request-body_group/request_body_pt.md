# Corpo da solicitação

Receba corpos de solicitação JSON usando modelos Pydantic.

---

## Modelo básico
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
## Campo de corpo com `embed`

Substitua o nome do campo ou injete campos JSON extras:
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
## Vários parâmetros corporais

Passe vários modelos — FastAPI os aninha sob seus nomes de parâmetros:
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
## Modelos aninhados

Os modelos podem conter outros modelos, listas e campos opcionais:
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
Independente de roteador – os mesmos modelos Pydantic funcionam em FBR e Modular.

## Limitações

- O corpo é analisado automaticamente quando você anota um parâmetro do modelo Pydantic
- FastAPI lida com validação e retorna 422 em entrada inválida
- Não é necessário nenhum decorador `"@Body()` — comportamento FastAPI padrão