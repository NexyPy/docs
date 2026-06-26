# Tests

Les applications Nexy sont des applications FastAPI sous le capot : testez-les avec `TestClient` de Starlette.

{% raw %}```bash
pip install httpx pytest-anyio  # httpx for TestClient, anyio for async tests
```{% endraw %}

## Configuration des tests

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

## Tester les itinéraires

{% raw %}```python
def test_create_user():
    response = client.post("/users", json={"name": "Alice", "email": "a"@b.com"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Alice"
```{% endraw %}

## Test avec authentification

{% raw %}```python
def test_protected_route():
    response = client.get("/admin", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
```{% endraw %}

## Luminaires avec pytest

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

## Test de WebSocket

{% raw %}```python
def test_ws():
    with client.websocket_connect("/ws") as ws:
        ws.send_json({"type": "ping"})
        data = ws.receive_json()
        assert data["type"] == "pong"
```{% endraw %}

## Tests asynchrones

{% raw %}```python
import pytest

"@pytest.mark.anyio
async def test_async_route():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
```{% endraw %}

## Conseils

- Utilisez `TestClient` comme gestionnaire de contexte si votre application comporte des événements de durée de vie
- Se moquer des services externes avec `httpx.MockTransport` ou `responses`
- Exécutez des tests avec `pytest tests/ -v` (aucune commande Nexy spéciale n'est nécessaire)
- Le TestClient utilise `httpx` en interne — même API que `requests`