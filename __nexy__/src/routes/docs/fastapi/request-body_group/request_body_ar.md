#طلب الهيئة

تلقي أجسام طلب JSON باستخدام نماذج Pydantic.

---

## النموذج الأساسي
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
## حقل الجسم مع `embed`

تجاوز اسم الحقل أو أدخل حقول JSON إضافية:
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
## معلمات الجسم المتعددة

تمرير عدة نماذج — يقوم FastAPI بتضمينها تحت أسماء المعلمات الخاصة بها:
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
## النماذج المتداخلة

يمكن أن تحتوي النماذج على نماذج وقوائم وحقول اختيارية أخرى:
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
لا يمكن تحديد جهاز التوجيه - تعمل نفس نماذج Pydantic في كل من FBR وModular.

## القيود

- يتم تحليل النص تلقائيًا عند كتابة تعليق توضيحي لمعلمة نموذج Pydantic
- يقوم FastAPI بمعالجة التحقق من الصحة وإرجاع 422 عند الإدخال غير الصالح
- لا حاجة إلى مصمم `"@Body()` - سلوك FastAPI القياسي