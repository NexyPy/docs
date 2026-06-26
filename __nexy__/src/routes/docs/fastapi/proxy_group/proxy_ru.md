# За прокси

При работе через Nginx, Caddy, Cloudflare или балансировщик нагрузки настройте Nexy так, чтобы он доверял пересылаемым заголовкам.

## Пересылаемые заголовки

{% raw %}```python
# nexyconfig.py
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTrustedHost = {
        "allowed_hosts": ["*"],
    }
```{% endraw %}

## Ювикорн

При работе с `nx start` или напрямую с uvicorn передайте флаг `--proxy-headers`:

{% raw %}```bash
nx start --proxy-headers

# or
uvicorn nexy.app:app --proxy-headers --forwarded-allow-ips="*"
```{% endraw %}

## Корневой путь

Если ваше приложение смонтировано по подпути (например, `https://example.com/myapp/`):

{% raw %}```python
# nexyconfig.py
from nexy import app

app.root_path = "/myapp"
```{% endraw %}

## Пример Nginx

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

## Эффекты

При правильной настройке:
- `request.url` отражает исходный URL, а не внутренний
- В редиректах используется правильная схема (https).
- Ограничение скорости и определение IP-адреса клиента используют реальный IP-адрес клиента.
- URL-адреса документов OpenAPI генерируются правильно.