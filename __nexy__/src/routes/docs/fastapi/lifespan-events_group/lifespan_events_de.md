# Lebensspanne-Ereignisse

Führen Sie Code aus, bevor die App mit der Bereitstellung beginnt oder wenn sie heruntergefahren wird.

## Mit `nexy.app`

{% raw %}```python
# In any file loaded at startup (e.g., nexyconfig.py, src/events.py)
from nexy import app

"@app.on_event("startup")
async def startup():
    print("App starting...")
    await db.connect()

"@app.on_event("shutdown")
async def shutdown():
    print("App shutting down...")
    await db.disconnect()
```{% endraw %}

## Lebensdauer des Kontextmanagers (FastAPI 3.0+)

{% raw %}```python
from contextlib import asynccontextmanager
from nexy import app

"@asynccontextmanager
async def lifespan():
    print("Startup")
    await db.connect()
    yield
    print("Shutdown")
    await db.disconnect()

app.router.lifespan_context = lifespan
```{% endraw %}

## Wann werden Lebensspanne-Ereignisse verwendet?

| Anwendungsfall | Veranstaltung |
|----------|-------|
| Datenbankverbindungspool | `startup` |
| Cache-Erwärmung | `startup` |
| ML-Modelle laden | `startup` |
| Enge Verbindungen | `shutdown` |
| Warteschlangen leeren | `shutdown` |

## Mehrere Event-Handler

{% raw %}```python
"@app.on_event("startup")
async def first():
    ...

"@app.on_event("startup")
async def second():
    ...
```{% endraw %}

## Hinweis

- Lebensdauerereignisse erfolgen **nicht** pro Anfrage – sie werden einmal beim Starten/Stoppen der App ausgeführt
– In der Entwicklung (`nx dev`) werden Ereignisse bei jedem Neuladen ausgeführt
- Verwenden Sie `nx start` für die Produktion – Ereignisse werden beim Start einmal ausgeführt