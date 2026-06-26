# Вебсокет (FBR)

Определите конечную точку WebSocket, создав файл `.py` с функцией `async def SOCKET`.

---

## Базовое эхо

{% raw %}```python
# src/routes/chat.py
from fastapi import WebSocket, WebSocketDisconnect

async def SOCKET(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Echo: {data}")
    except WebSocketDisconnect:
        pass
```{% endraw %}

Имя функции `SOCKET` (без учета регистра) соответствует конечной точке Starlette WebSocket. Путь к файлу определяет URL-адрес — в этом примере `/chat`.

---

## Получить JSON

{% raw %}```python
# src/routes/events.py
from fastapi import WebSocket, WebSocketDisconnect
import json

async def SOCKET(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            await websocket.send_json({"echo": data})
    except WebSocketDisconnect:
        pass
```{% endraw %}

---

## Схема помещения

Рассылка сообщений всем подключенным клиентам:

{% raw %}```python
# src/routes/chat.py
from fastapi import WebSocket, WebSocketDisconnect

connections: list[WebSocket] = []

async def SOCKET(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for conn in connections:
                await conn.send_text(data)
    except WebSocketDisconnect:
        connections.remove(websocket)
```{% endraw %}

Список `connections` существует на уровне модуля — все клиенты используют один и тот же список.

---

## Именованные комнаты

Группировать соединения по названию комнаты:

{% raw %}```python
# src/routes/rooms/{room_id}.py
from fastapi import WebSocket, WebSocketDisconnect

rooms: dict[str, list[WebSocket]] = {}

async def SOCKET(websocket: WebSocket, room_id: str):
    await websocket.accept()
    rooms.setdefault(room_id, []).append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for conn in rooms.get(room_id, []):
                await conn.send_text(data)
    except WebSocketDisconnect:
        rooms[room_id].remove(websocket)
        if not rooms[room_id]:
            del rooms[room_id]
```{% endraw %}

Параметр URL `{room_id}` автоматически добавляется из имени файла.

---

## Жизненный цикл соединения

| Событие | Что происходит |
|-------|-------------|
| Клиент подключается | `websocket.accept()` — должен быть вызван первым |
| Сообщение получено | `receive_text()` / `receive_json()` / `receive_bytes()` |
| Клиент отключается | `WebSocketDisconnect` поднят — очистка в `except` |
| Сервер закрывается | `await websocket.close(code=1000)` |

Всегда заключайте цикл сообщений в `try/except WebSocketDisconnect`, чтобы очистить соединения.

---

## Клиент

{% raw %}```javascript
const ws = new WebSocket("ws://localhost:3000/chat");
ws.onmessage = (event) => console.log(event.data);
ws.send("Hello from the client!");
```{% endraw %}

---

## См. также

- [Route Handlers](/docs/fbrouters/route_handlers) — конечные точки REST в FBR
- [WebSocket Guide](/docs/guides/websocket) — концептуальный обзор