# テスト

Nexy アプリは内部的には FastAPI アプリです。Starlette の `TestClient` でテストしてください。

{% raw %}```bash
pip install httpx pytest-anyio  # httpx for TestClient, anyio for async tests
```{% endraw %}

## テストのセットアップ

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

## ルートのテスト

{% raw %}```python
def test_create_user():
    response = client.post("/users", json={"name": "Alice", "email": "a"@b.com"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Alice"
```{% endraw %}

## 認証を使用したテスト

{% raw %}```python
def test_protected_route():
    response = client.get("/admin", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
```{% endraw %}

## pytest を使用したフィクスチャ

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

## WebSocket のテスト

{% raw %}```python
def test_ws():
    with client.websocket_connect("/ws") as ws:
        ws.send_json({"type": "ping"})
        data = ws.receive_json()
        assert data["type"] == "pong"
```{% endraw %}

## 非同期テスト

{% raw %}```python
import pytest

"@pytest.mark.anyio
async def test_async_route():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
```{% endraw %}

## ヒント

- アプリにライフスパン イベントがある場合は、`TestClient` をコンテキスト マネージャーとして使用します
- `httpx.MockTransport` または `responses` を使用して外部サービスをモックする
- `pytest tests/ -v` でテストを実行します (特別な Nexy コマンドは必要ありません)
- TestClient は内部で `httpx` を使用します - `requests` と同じ API