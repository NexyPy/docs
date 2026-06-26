# نص الطلب (FBR)

تلقي أجسام طلب JSON باستخدام نماذج Pydantic.

## النموذج الأساسي

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

## حقل الجسم مع `embed`

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

## معلمات الجسم المتعددة

{% raw %}```python
def POST(item: Item, user: User):
    # Expects: {"item": {...}, "user": {...}}
    ...
```{% endraw %}

## النماذج المتداخلة

يمكن أن تحتوي النماذج على نماذج وقوائم وحقول اختيارية أخرى.

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

يتم تحليل النص تلقائيًا عند كتابة تعليق توضيحي لمعلمة نموذج Pydantic. يقوم FastAPI بمعالجة التحقق من الصحة وإرجاع 422 عند إدخال غير صالح.

---

انظر أيضًا: [FastAPI Request Body](/docs/fastapi/request-body) لمزيد من التفاصيل.