# Vom Server gesendete Ereignisse (modular)

Streamen Sie Echtzeitereignisse mithilfe von Controllern über HTTP vom Server zum Client.

## Installieren

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

## Endpunkt

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

## Dynamischer Ereignisstrom

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