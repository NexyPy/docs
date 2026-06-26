# الأحداث المرسلة من الخادم (معيارية)

دفق الأحداث في الوقت الفعلي من الخادم إلى العميل عبر HTTP باستخدام وحدات التحكم.

## ثَبَّتَ

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

## نقطة النهاية

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

## تيار الحدث الديناميكي

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