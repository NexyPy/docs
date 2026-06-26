# Веб-перехватчики и обратные вызовы OpenAPI

Определите веб-перехватчики и обратные вызовы в своей схеме OpenAPI, чтобы потребители знали, что им отправляет ваш API.

## Вебхуки

Вебхуки — это исходящие события, которые ваш API отправляет на внешние URL-адреса.

{% raw %}```python
from nexy import app
from pydantic import BaseModel

class WebhookPayload(BaseModel):
    event: str
    data: dict

"@app.webhooks.post("/")
async def event_webhook(payload: WebhookPayload):
    """Sent when an event occurs."""
    ...
```{% endraw %}

Это регистрирует вебхук в схеме OpenAPI. Потребители видят ожидаемую форму полезной нагрузки в `/docs`.

## Обратные вызовы

Обратные вызовы описывают запросы, которые ваш API будет отправлять на сервер потребителя.

{% raw %}```python
from pydantic import BaseModel
from fastapi import APIRouter

class Invoice(BaseModel):
    id: str
    amount: float
    status: str

callback_router = APIRouter()

"@callback_router.post("/invoice-callback", response_model=Invoice)
def invoice_notification(body: Invoice):
    ...
```{% endraw %}

Передайте маршрутизатор обратного вызова на маршрут:

{% raw %}```python
from fastapi import FastAPI

app = FastAPI()

"@app.post("/create-invoice", callbacks=callback_router.routes)
def create_invoice(invoice: Invoice):
    # Your logic here
    return {"status": "processing"}
```{% endraw %}

Это создает дополнительные пути в спецификации OpenAPI, показывающие, что ваш API будет отправлять POST на внешний URL-адрес.

## Зачем их использовать

- Автоматически создаваемая документация для потребителей API.
- Типобезопасное определение контракта
- Работает с любым генератором клиентов OpenAPI.
- Нет эффекта времени выполнения — чисто для документации.