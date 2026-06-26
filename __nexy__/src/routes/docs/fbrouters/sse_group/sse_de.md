# Vom Server gesendete Ereignisse (FBR)

Streamen Sie Echtzeitereignisse vom Server zum Client über HTTP.

## Installieren

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

## Endpunkt

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

## Dynamischer Ereignisstrom

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

## Kunde

{% raw %}```javascript
const evtSource = new EventSource("/events");
evtSource.addEventListener("ping", (e) => {
    console.log(e.data);
});
```{% endraw %}

## Einschränkungen

- SSE ist **unidirektional** (Server → Client) – verwenden Sie WebSocket für bidirektional
- `sse-starlette` standardmäßig nicht enthalten – `pip install sse-starlette`
- Jede Verbindung enthält eine offene HTTP-Verbindung – überwachen Sie Ihre Serverlimits