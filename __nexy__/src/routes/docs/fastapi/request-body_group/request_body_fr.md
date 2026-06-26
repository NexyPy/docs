# Corps de la demande

Recevez des corps de requête JSON à l'aide de modèles Pydantic.

---

## Modèle de base
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
## Champ de corps avec `embed`

Remplacez le nom du champ ou injectez des champs JSON supplémentaires :
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
## Plusieurs paramètres corporels

Transmettez plusieurs modèles — FastAPI les imbrique sous leurs noms de paramètres :
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
## Modèles imbriqués

Les modèles peuvent contenir d'autres modèles, listes et champs facultatifs :
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
Indépendant du routeur – les mêmes modèles Pydantic fonctionnent à la fois en FBR et en Modular.

## Limites

- Le corps est analysé automatiquement lorsque vous annotez un paramètre de modèle Pydantic
- FastAPI gère la validation et renvoie 422 en cas d'entrée invalide
- Aucun décorateur `"@Body()` nécessaire – comportement FastAPI standard