# Pruebas

Las aplicaciones Nexy son aplicaciones FastAPI internas: pruébalas con `TestClient` de Starlette.

{% raw %}```bash
pip install httpx pytest-anyio  # httpx for TestClient, anyio for async tests
```{% endraw %}

## Configuración de prueba

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

## Rutas de prueba

{% raw %}```python
def test_create_user():
    response = client.post("/users", json={"name": "Alice", "email": "a"@b.com"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Alice"
```{% endraw %}

## Prueba con autenticación

{% raw %}```python
def test_protected_route():
    response = client.get("/admin", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
```{% endraw %}

## Accesorios con pytest

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

## Probando WebSocket

{% raw %}```python
def test_ws():
    with client.websocket_connect("/ws") as ws:
        ws.send_json({"type": "ping"})
        data = ws.receive_json()
        assert data["type"] == "pong"
```{% endraw %}

## Pruebas asíncronas

{% raw %}```python
import pytest

"@pytest.mark.anyio
async def test_async_route():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
```{% endraw %}

## Consejos

- Utilice `TestClient` como administrador de contexto si su aplicación tiene eventos de vida útil
- Simular servicios externos con `httpx.MockTransport` o `responses`
- Ejecute pruebas con `pytest tests/ -v` (no se necesita ningún comando especial de Nexy)
- TestClient utiliza `httpx` internamente: la misma API que `requests`