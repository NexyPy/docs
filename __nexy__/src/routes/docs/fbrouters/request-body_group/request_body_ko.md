# 요청 본문(FBR)

Pydantic 모델을 사용하여 JSON 요청 본문을 수신합니다.

## 기본 모델

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

## `embed`가 포함된 본문 필드

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

## 다중 신체 매개변수

{% raw %}```python
def POST(item: Item, user: User):
    # Expects: {"item": {...}, "user": {...}}
    ...
```{% endraw %}

## 중첩 모델

모델에는 다른 모델, 목록 및 선택적 필드가 포함될 수 있습니다.

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

Pydantic 모델 매개변수에 유형 주석을 달면 본문이 자동으로 구문 분석됩니다. FastAPI는 유효성 검사를 처리하고 잘못된 입력 시 422를 반환합니다.

---

자세한 내용은 [FastAPI Request Body](/docs/fastapi/request-body)를 참조하세요.