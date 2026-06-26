# अनुरोध निकाय (मॉड्यूलर)

नियंत्रकों में पाइडेंटिक मॉडल का उपयोग करके JSON अनुरोध निकाय प्राप्त करें।

## बुनियादी मॉडल

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

## `embed` के साथ बॉडी फ़ील्ड

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

## शरीर के अनेक पैरामीटर

{% raw %}```python
"@Controller("/orders")
class OrderController:
    def post(self, item: Item, user: User):
        # Expects: {"item": {...}, "user": {...}}
        ...
```{% endraw %}

## नेस्टेड मॉडल

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

फास्टएपीआई सत्यापन को संभालता है और अमान्य इनपुट पर 422 लौटाता है।

---

यह भी देखें: [Controllers](/docs/modular/controllers), [FastAPI Request Body](/docs/fastapi/request-body)