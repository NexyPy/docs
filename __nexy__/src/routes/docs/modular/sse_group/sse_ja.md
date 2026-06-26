# サーバー送信イベント (モジュール式)

コントローラーを使用して、HTTP 経由でサーバーからクライアントにリアルタイム イベントをストリーミングします。

＃＃ インストール

{% raw %}```bash
pip install sse-starlette
```{% endraw %}

＃＃ 終点

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

## 動的イベントストリーム

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