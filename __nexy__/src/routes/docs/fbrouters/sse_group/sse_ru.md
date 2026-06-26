# событий, отправленных сервером (FBR)

Потоковая передача событий в реальном времени от сервера к клиенту через HTTP.

## Установить

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

## Конечная точка

{% raw %}```python
# src/routes/events.py
import asyncio
from sse_starlette.sse import EventSourceResponse

async def event_generator():
    for i in range(10):
        await asyncio.sleep(1)
        yield {"event": "ping", "data": str(i)}

async def GET():
    return EventSourceResponse(event_generator())
```{% endraw %}

## Динамический поток событий

{% raw %}```python
import asyncio
from sse_starlette.sse import EventSourceResponse

async def GET(count: int = 5, interval: float = 0.5):
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