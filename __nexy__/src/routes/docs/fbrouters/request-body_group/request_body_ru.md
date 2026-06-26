# Тело запроса (FBR)

Получайте тела запросов JSON, используя модели Pydantic.

## Базовая модель

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

## Поле тела с `embed`

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

## Несколько параметров тела

{% raw %}```python
def POST(item: Item, user: User):
    # Expects: {"item": {...}, "user": {...}}
    ...
```{% endraw %}

## Вложенные модели

Модели могут содержать другие модели, списки и необязательные поля.

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

Тело анализируется автоматически, когда вы вводите аннотацию параметра модели Pydantic. FastAPI обрабатывает проверку и возвращает 422 при недопустимом вводе.

---

См. также: [FastAPI Request Body](/docs/fastapi/request-body) для получения более подробной информации.