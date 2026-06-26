# Unteranwendungen und Halterungen

Hängen Sie unabhängige ASGI- oder WSGI-Anwendungen in einem Unterpfad ein.

## Mounten einer Sub-App

{% raw %}```python
from nexy import app
from fastapi import FastAPI

sub_app = FastAPI()

"@sub_app.get("/")
def sub_home():
    return {"from": "sub-app"}

app.mount("/sub", sub_app)
```{% endraw %}

Jetzt bedient `/sub/` die Unteranwendung. Es verfügt über eigene Routen, Middleware und Lebensdauer.

## Starlette-Sub-App

{% raw %}```python
from starlette.applications import Starlette
from starlette.responses import PlainTextResponse

starlette_app = Starlette()
"@starlette_app.route("/")
async def index(request):
    return PlainTextResponse("Starlette sub-app")

app.mount("/legacy", starlette_app)
```{% endraw %}

## WSGI-Sub-App (Flask, Django)

Siehe [WSGI](/docs/fastapi/wsgi).

## Wie Reittiere funktionieren

– Das Mount-Präfix wird entfernt, bevor Anfragen die Sub-App erreichen
– Unter-Apps haben ihren **eigenen Middleware-Stack** – Nexy-Authentifizierung/Middleware gilt nicht
- Unter-Apps können beliebige ASGI-Anwendungen sein (FastAPI, Starlette, Litestar usw.)
- Reittiere sind bestellt – das erste Spiel gewinnt

## Einschränkungen

– WebSocket wird nicht über mehrere Mounts hinweg unterstützt
- Lebensspanne-Ereignisse gelten pro App
– OpenAPI-Dokumente decken nur die Root-App ab – Sub-App-Dokumente erfordern eine separate Einrichtung