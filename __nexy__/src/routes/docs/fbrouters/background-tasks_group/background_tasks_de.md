# Hintergrundaufgaben (FBR)

Führen Sie den Code *nach* dem Senden der Antwort aus – für Protokollierung, Benachrichtigungen und Cache-Erwärmung.

{% raw %}```python
from fastapi import BackgroundTasks
```{% endraw %}

## Einzelaufgabe

{% raw %}```python
# src/routes/log.py
from fastapi import BackgroundTasks

def write_log(message: str):
    with open("app.log", "a") as f:
        f.write(message + "\n")

def GET(tasks: BackgroundTasks):
    tasks.add_task(write_log, "Page visited")
    return {"status": "ok"}
```{% endraw %}

## Mehrere Aufgaben

{% raw %}```python
from fastapi import BackgroundTasks

def GET(tasks: BackgroundTasks):
    tasks.add_task(log_visit)
    tasks.add_task(notify_admin)
    tasks.add_task(warm_cache)
    return {"ok": True}
```{% endraw %}

## Aufgabe mit Abhängigkeiten

{% raw %}```python
from fastapi import BackgroundTasks, Depends
from src.db import get_db

def cleanup_old_records(db=Depends(get_db)):
    db.query(Log).delete()

def GET(tasks: BackgroundTasks):
    tasks.add_task(cleanup_old_records)
    return {"status": "cleaning"}
```{% endraw %}

## Wichtig

– Aufgaben werden **nachdem** die Antwort gesendet wurde – der Client wartet nicht
- Sie werden im selben Prozess ausgeführt – lange Aufgaben blockieren die Ereignisschleife
- Verwenden Sie für schwere Arbeiten eine Aufgabenwarteschlange (Celery, ARQ, RQ usw.)
- Fehler in Aufgaben werden stillschweigend verschluckt – fügen Sie try/exclusive innerhalb der Aufgabenfunktion hinzu
– Aufgaben erhalten **Kopien** veränderlicher Objekte – Mutationen haben keinen Einfluss auf die Antwort