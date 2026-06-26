# Eventos enviados por el servidor (FBR)

Transmita eventos en tiempo real desde el servidor al cliente a través de HTTP.

## Instalar

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

## Punto final

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

## Flujo de eventos dinámico

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

## Cliente

{% raw %}```javascript
const evtSource = new EventSource("/events");
evtSource.addEventListener("ping", (e) => {
    console.log(e.data);
});
```{% endraw %}

## Limitaciones

- SSE es **unidireccional** (servidor → cliente): use WebSocket para bidireccional
- `sse-starlette` no incluido por defecto — `pip install sse-starlette`
- Cada conexión tiene una conexión HTTP abierta: controle los límites de su servidor