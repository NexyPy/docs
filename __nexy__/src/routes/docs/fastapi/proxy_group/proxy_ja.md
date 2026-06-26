# プロキシの背後で

Nginx、Caddy、Cloudflare、またはロードバランサーの背後で実行している場合は、転送されたヘッダーを信頼するように Nexy を構成します。

## 転送されたヘッダー

{% raw %}```python
# nexyconfig.py
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTrustedHost = {
        "allowed_hosts": ["*"],
    }
```{% endraw %}

## ユビコーン

`nx start` で実行するか、uvicorn で直接実行する場合は、`--proxy-headers` フラグを渡します。

{% raw %}```bash
nx start --proxy-headers

# or
uvicorn nexy.app:app --proxy-headers --forwarded-allow-ips="*"
```{% endraw %}

## ルートパス

アプリがサブパスにマウントされている場合 (例: `https://example.com/myapp/`):)

{% raw %}```python
# nexyconfig.py
from nexy import app

app.root_path = "/myapp"
```{% endraw %}

## Nginx の例

{% raw %}```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```{% endraw %}

## 効果

正しく構成されている場合:
- `request.url` は内部 URL ではなく、元の URL を反映します。
- リダイレクトは正しいスキーム (https) を使用します。
- レート制限とクライアント IP 検出は実際のクライアント IP を使用します
- OpenAPI ドキュメントの URL が正しく生成される