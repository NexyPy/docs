# Server-Sent Events (FBR)

Stream real-time events from server to client over HTTP.

## Install

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

## Endpoint

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

## Dynamic event stream

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

## Client

{% raw %}```javascript
const evtSource = new EventSource("/events");
evtSource.addEventListener("ping", (e) => {
    console.log(e.data);
});
```{% endraw %}

## Limitations

- SSE is **unidirectional** (server → client) — use WebSocket for bidirectional
- `sse-starlette` not included by default — `pip install sse-starlette`
- Each connection holds an open HTTP connection — monitor your server limits