# サーバー送信イベント (FBR)

HTTP 経由でサーバーからクライアントにリアルタイム イベントをストリーミングします。

＃＃ インストール

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

＃＃ 終点

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

## 動的イベントストリーム

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

＃＃ クライアント

{% raw %}```javascript
const evtSource = new EventSource("/events");
evtSource.addEventListener("ping", (e) => {
    console.log(e.data);
});
```{% endraw %}

## 制限事項

- SSE は **単方向** (サーバー → クライアント) — 双方向には WebSocket を使用します
- `sse-starlette` はデフォルトでは含まれません — `pip install sse-starlette`
- 各接続はオープンな HTTP 接続を保持します - サーバーの制限を監視してください