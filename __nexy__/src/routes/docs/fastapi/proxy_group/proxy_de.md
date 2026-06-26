# Hinter einem Proxy

Wenn Sie Nexy hinter Nginx, Caddy, Cloudflare oder einem Load Balancer ausführen, konfigurieren Sie Nexy so, dass weitergeleiteten Headern vertraut wird.

## Weitergeleitete Header

{% raw %}```python
# nexyconfig.py
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTrustedHost = {
        "allowed_hosts": ["*"],
    }
```{% endraw %}

## Uvicorn

Übergeben Sie beim Ausführen mit `nx start` oder direkt mit uvicorn das Flag `--proxy-headers`:

{% raw %}```bash
nx start --proxy-headers

# or
uvicorn nexy.app:app --proxy-headers --forwarded-allow-ips="*"
```{% endraw %}

## Root-Pfad

Wenn Ihre App in einem Unterpfad gemountet ist (z. B. „https://example.com/myapp/`):“)

{% raw %}```python
# nexyconfig.py
from nexy import app

app.root_path = "/myapp"
```{% endraw %}

## Nginx-Beispiel

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

## Effekte

Bei korrekter Konfiguration:
- `request.url` spiegelt die ursprüngliche URL wider, nicht die interne
- Weiterleitungen verwenden das richtige Schema (https)
- Ratenbegrenzung und Client-IP-Erkennung verwenden die echte Client-IP
– OpenAPI-Dokument-URLs werden korrekt generiert