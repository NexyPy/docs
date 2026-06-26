# Background Tasks (FBR)

Run code *after* sending the response — for logging, notifications, cache warming.

{% raw %}```python
from fastapi import BackgroundTasks
```{% endraw %}

## Single task

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

## Multiple tasks

{% raw %}```python
from fastapi import BackgroundTasks

def GET(tasks: BackgroundTasks):
    tasks.add_task(log_visit)
    tasks.add_task(notify_admin)
    tasks.add_task(warm_cache)
    return {"ok": True}
```{% endraw %}

## Task with dependencies

{% raw %}```python
from fastapi import BackgroundTasks, Depends
from src.db import get_db

def cleanup_old_records(db=Depends(get_db)):
    db.query(Log).delete()

def GET(tasks: BackgroundTasks):
    tasks.add_task(cleanup_old_records)
    return {"status": "cleaning"}
```{% endraw %}

## Important

- Tasks run **after** the response is sent — the client doesn't wait
- They run in the same process — long tasks block the event loop
- For heavy work, use a task queue (Celery, ARQ, RQ, etc.)
- Errors in tasks are silently swallowed — add try/except inside the task function
- Tasks receive **copies** of mutable objects — mutations won't affect the response