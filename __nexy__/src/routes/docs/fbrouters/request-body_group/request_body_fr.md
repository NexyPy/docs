# Corps de la demande (FBR)

Recevez des corps de requête JSON à l'aide de modèles Pydantic.

## Modèle de base

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

## Champ de corps avec `embed`

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

## Plusieurs paramètres corporels

{% raw %}```python
def POST(item: Item, user: User):
    # Expects: {"item": {...}, "user": {...}}
    ...
```{% endraw %}

## Modèles imbriqués

Les modèles peuvent contenir d'autres modèles, listes et champs facultatifs.

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

Le corps est analysé automatiquement lorsque vous saisissez un paramètre de modèle Pydantic. FastAPI gère la validation et renvoie 422 en cas d'entrée non valide.

---

Voir aussi : [FastAPI Request Body](/docs/fastapi/request-body) pour plus de détails.