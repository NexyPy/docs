# событий, отправленных сервером (модульный)

Передавайте события в реальном времени от сервера к клиенту через HTTP с помощью контроллеров.

## Установить

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

## Конечная точка

{% raw %}```python
from nexy.decorators import Controller
from sse_starlette.sse import EventSourceResponse
import asyncio

"@Controller("/events")
class EventsController:
    async def GET(self):
        async def gen():
            for i in range(10):
                await asyncio.sleep(1)
                yield {"event": "ping", "data": str(i)}
        return EventSourceResponse(gen())
```{% endraw %}

## Динамический поток событий

{% raw %}```python
from nexy.decorators import Controller
from sse_starlette.sse import EventSourceResponse
import asyncio

"@Controller("/ticks")
class TickController:
    async def GET(self, count: int = 5, interval: float = 0.5):
        async def gen():
            for i in range(count):
                await asyncio.sleep(interval)
                yield {"event": "tick", "data": str(i)}
        return EventSourceResponse(gen())
```{% endraw %}

## Клиент

{% raw %}```javascript
const evtSource = new EventSource("/events");
evtSource.addEventListener("ping", (e) => {
    console.log(e.data);
});
```{% endraw %}

## Ограничения

- SSE является **однонаправленным** (сервер → клиент) — используйте WebSocket для двунаправленной связи.
- `sse-starlette` не включен по умолчанию — `pip install sse-starlette`
- Каждое соединение имеет открытое HTTP-соединение — следите за ограничениями вашего сервера.