# परीक्षण

नेक्सी ऐप्स हुड के तहत फास्टएपीआई ऐप्स हैं - उन्हें स्टारलेट के `TestClient` के साथ परीक्षण करें।

{% raw %}```bash
pip install httpx pytest-anyio  # httpx for TestClient, anyio for async tests
```{% endraw %}

## टेस्ट सेटअप

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

## परीक्षण मार्ग

{% raw %}```python
def test_create_user():
    response = client.post("/users", json={"name": "Alice", "email": "a"@b.com"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Alice"
```{% endraw %}

## प्रमाणीकरण के साथ परीक्षण

{% raw %}```python
def test_protected_route():
    response = client.get("/admin", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
```{% endraw %}

## पाइटेस्ट के साथ फिक्स्चर

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

## वेबसॉकेट का परीक्षण

{% raw %}```python
def test_ws():
    with client.websocket_connect("/ws") as ws:
        ws.send_json({"type": "ping"})
        data = ws.receive_json()
        assert data["type"] == "pong"
```{% endraw %}

## एसिंक परीक्षण

{% raw %}```python
import pytest

"@pytest.mark.anyio
async def test_async_route():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
```{% endraw %}

## युक्तियाँ

- यदि आपके ऐप में जीवनकाल की घटनाएं हैं तो संदर्भ प्रबंधक के रूप में `TestClient` का उपयोग करें
- `httpx.MockTransport` या `responses` के साथ बाहरी सेवाओं का अनुकरण करें
- `pytest tests/ -v` के साथ परीक्षण चलाएँ (कोई विशेष Nexy कमांड की आवश्यकता नहीं)
- TestClient आंतरिक रूप से `httpx` का उपयोग करता है - `requests` के समान API