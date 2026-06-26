# Testen

Nexy-Apps sind unter der Haube FastAPI-Apps – testen Sie sie mit Starlettes `TestClient`.

{% raw %}```bash
pip install httpx pytest-anyio  # httpx for TestClient, anyio for async tests
```{% endraw %}

## Testaufbau

{% raw %}```python
# tests/test_app.py
from fastapi.testclient import TestClient
from nexy.app import app

client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}
```{% endraw %}

## Routen testen

{% raw %}```python
def test_create_user():
    response = client.post("/users", json={"name": "Alice", "email": "a"@b.com"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Alice"
```{% endraw %}

## Testen mit Auth

{% raw %}```python
def test_protected_route():
    response = client.get("/admin", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
```{% endraw %}

## Fixtures mit Pytest

{% raw %}```python
# conftest.py
import pytest
from fastapi.testclient import TestClient
from nexy.app import app

"@pytest.fixture
def client():
    return TestClient(app)

# test_users.py
def test_list_users(client):
    resp = client.get("/users")
    assert resp.status_code == 200
```{% endraw %}

## WebSocket testen

{% raw %}```python
def test_ws():
    with client.websocket_connect("/ws") as ws:
        ws.send_json({"type": "ping"})
        data = ws.receive_json()
        assert data["type"] == "pong"
```{% endraw %}

## Asynchrone Tests

{% raw %}```python
import pytest

"@pytest.mark.anyio
async def test_async_route():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
```{% endraw %}

## Tipps

– Verwenden Sie `TestClient` als Kontextmanager, wenn Ihre App über Lebensdauerereignisse verfügt
- Externe Dienste mit `httpx.MockTransport` oder `responses` simulieren
- Führen Sie Tests mit `pytest tests/ -v` durch (kein spezieller Nexy-Befehl erforderlich)
– Der TestClient verwendet intern `httpx` – dieselbe API wie `requests`