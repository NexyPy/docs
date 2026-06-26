# الاختبار

تطبيقات Nexy هي تطبيقات FastAPI تحت الغطاء - اختبرها باستخدام `TestClient` من Starlette.

{% raw %}```bash
pip install httpx pytest-anyio  # httpx for TestClient, anyio for async tests
```{% endraw %}

## إعداد الاختبار

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

## طرق الاختبار

{% raw %}```python
def test_create_user():
    response = client.post("/users", json={"name": "Alice", "email": "a"@b.com"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Alice"
```{% endraw %}

## الاختبار بالمصادقة

{% raw %}```python
def test_protected_route():
    response = client.get("/admin", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
```{% endraw %}

## المباريات مع pytest

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

## اختبار WebSocket

{% raw %}```python
def test_ws():
    with client.websocket_connect("/ws") as ws:
        ws.send_json({"type": "ping"})
        data = ws.receive_json()
        assert data["type"] == "pong"
```{% endraw %}

## اختبارات غير متزامنة

{% raw %}```python
import pytest

"@pytest.mark.anyio
async def test_async_route():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
```{% endraw %}

## نصائح

- استخدم `TestClient` كمدير للسياق إذا كان تطبيقك يحتوي على أحداث مدى الحياة
- خدمات خارجية وهمية باستخدام `httpx.MockTransport` أو `responses`
- إجراء الاختبارات باستخدام `pytest tests/ -v` (لا حاجة إلى أمر Nexy خاص)
- يستخدم TestClient `httpx` داخليًا — نفس واجهة برمجة التطبيقات مثل `requests`