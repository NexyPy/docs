# Тело запроса

Получайте тела запросов JSON, используя модели Pydantic.

---

## Базовая модель
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
## Поле тела с `embed`

Переопределите имя поля или добавьте дополнительные поля JSON:
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
## Несколько параметров тела

Передайте несколько моделей — FastAPI вкладывает их по именам параметров:
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
## Вложенные модели

Модели могут содержать другие модели, списки и необязательные поля:
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
Независимость от маршрутизатора — одни и те же модели Pydantic работают как в FBR, так и в Modular.

## Ограничения

- Тело анализируется автоматически, когда вы вводите аннотацию к параметру модели Pydantic.
- FastAPI обрабатывает проверку и возвращает 422 при неверном вводе.
- Декоратор `"@Body()` не требуется — стандартное поведение FastAPI.