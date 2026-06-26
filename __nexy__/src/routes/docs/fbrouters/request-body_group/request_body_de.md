# Anforderungstext (FBR)

Empfangen Sie JSON-Anfragetexte mithilfe von Pydantic-Modellen.

## Grundmodell

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

## Body-Feld mit `embed`

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

## Mehrere Körperparameter

{% raw %}```python
def POST(item: Item, user: User):
    # Expects: {"item": {...}, "user": {...}}
    ...
```{% endraw %}

## Verschachtelte Modelle

Modelle können andere Modelle, Listen und optionale Felder enthalten.

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

Der Körper wird automatisch analysiert, wenn Sie einen Pydantic-Modellparameter mit Anmerkungen versehen. FastAPI übernimmt die Validierung und gibt bei ungültiger Eingabe 422 zurück.

---

Weitere Informationen finden Sie auch unter: [FastAPI Request Body](/docs/fastapi/request-body).