# 服务器发送的事件 (FBR)

通过 HTTP 将实时事件从服务器传输到客户端。

＃＃ 安装

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

## 端点

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

## 动态事件流

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

＃＃ 客户

{% raw %}```javascript
const evtSource = new EventSource("/events");
evtSource.addEventListener("ping", (e) => {
    console.log(e.data);
});
```{% endraw %}

## 限制

- SSE 是**单向**（服务器 → 客户端）— 使用 WebSocket 进行双向
- 默认情况下不包括 `sse-starlette` — `pip install sse-starlette`
- 每个连接都拥有一个开放的 HTTP 连接 — 监控您的服务器限制