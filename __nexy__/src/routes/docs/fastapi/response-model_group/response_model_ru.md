# Модель ответа

Управляйте сериализацией ответов, кодами состояния и типами ответов.

---

## Пидантическая модель ответа
{% raw %}```python
---
from pydantic import BaseModel

class UserOut(BaseModel):
    id: int
    name: str
    email: str

def GET() -> UserOut:
    return UserOut(id=1, name="Alice", email="alice"@example.com")
---
```{% endraw %}
{% raw %}```python
from pydantic import BaseModel
from nexy.decorators import Controller

class UserOut(BaseModel):
    id: int
    name: str
    email: str

"@Controller("/users")
class UsersController:
    def GET(self) -> list[UserOut]:
        return [UserOut(id=1, name="Alice", email="alice"@example.com")]
```{% endraw %}
## Получение списка ответов
{% raw %}```python
---
def GET() -> list[UserOut]:
    return [UserOut(id=1, name="Alice")]
---
```{% endraw %}
{% raw %}```python
"@Controller("/users")
class UsersController:
    def GET(self) -> list[UserOut]:
        return [UserOut(id=1, name="Alice")]
```{% endraw %}
## Типы ответов

Импорт из `fastapi.responses`:
{% raw %}```python
from fastapi.responses import (
    JSONResponse,
    HTMLResponse,
    PlainTextResponse,
    RedirectResponse,
    StreamingResponse,
    FileResponse,
    ORJSONResponse,   # requires orjson
)
```{% endraw %}
### HTML-ответ
{% raw %}```python
---
from fastapi.responses import HTMLResponse

def GET() -> HTMLResponse:
    return HTMLResponse("<h1>Hello</h1>")
---
```{% endraw %}
{% raw %}```python
from fastapi.responses import HTMLResponse
from nexy.decorators import Controller

"@Controller("/page")
class PageController:
    def GET(self) -> HTMLResponse:
        return HTMLResponse("<h1>Hello</h1>")
```{% endraw %}
### Потоковый ответ
{% raw %}```python
---
from fastapi.responses import StreamingResponse
import io

def GET() -> StreamingResponse:
    return StreamingResponse(io.StringIO("large CSV data..."), media_type="text/csv")
---
```{% endraw %}
{% raw %}```python
from fastapi.responses import StreamingResponse
from nexy.decorators import Controller
import io

"@Controller("/export")
class ExportController:
    def GET(self) -> StreamingResponse:
        return StreamingResponse(io.StringIO("data..."), media_type="text/csv")
```{% endraw %}
## Прямой ответ с пользовательским статусом
{% raw %}```python
---
from fastapi.responses import JSONResponse

def GET() -> JSONResponse:
    return JSONResponse(
        content={"msg": "created"},
        status_code=201,
        headers={"X-Custom": "value"},
    )
---
```{% endraw %}
{% raw %}```python
from fastapi.responses import JSONResponse
from nexy.decorators import Controller, UseResponse

"@Controller("/items")
class ItemsController:
    "@UseResponse(status_code=201)
    def post(self, item: Item):
        return {"created": True}
```{% endraw %}
## Поддерживаемые типы ответов

| Класс | Тип контента | Вариант использования |
|-------|-------------|----------|
| `JSONResponse` | `application/json` | Данные JSON (по умолчанию) |
| `HTMLResponse` | `text/html` | HTML-строки |
| `PlainTextResponse` | `text/plain` | Необработанный текст |
| `RedirectResponse` | — | Перенаправления |
| `StreamingResponse` | варьируется | Потоковые данные |
| `FileResponse` | варьируется | Загрузка файлов |
| `ORJSONResponse` | `application/json` | Более быстрый JSON (требуется `orjson`) |

См. ["@UseResponse](/docs/decorators/useresponse) для установки кодов состояния в модульных контроллерах.