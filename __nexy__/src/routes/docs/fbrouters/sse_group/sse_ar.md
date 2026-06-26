# الأحداث المرسلة من الخادم (FBR)

دفق الأحداث في الوقت الحقيقي من الخادم إلى العميل عبر HTTP.

## ثَبَّتَ

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

## نقطة النهاية

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

## تيار الحدث الديناميكي

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

## عميل

{% raw %}```javascript
const evtSource = new EventSource("/events");
evtSource.addEventListener("ping", (e) => {
    console.log(e.data);
});
```{% endraw %}

## القيود

- SSE **أحادي الاتجاه** (الخادم → العميل) — استخدم WebSocket ثنائي الاتجاه
- `sse-starlette` غير مضمن افتراضيًا — `pip install sse-starlette`
- كل اتصال يحمل اتصال HTTP مفتوحًا - راقب حدود الخادم الخاص بك