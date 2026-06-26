# Tarefas em segundo plano (FBR)

Execute o código *após* enviar a resposta — para registro, notificações, aquecimento de cache.

{% raw %}```python
from fastapi import BackgroundTasks
```{% endraw %}

## Tarefa única

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

## Múltiplas tarefas

{% raw %}```python
from fastapi import BackgroundTasks

def GET(tasks: BackgroundTasks):
    tasks.add_task(log_visit)
    tasks.add_task(notify_admin)
    tasks.add_task(warm_cache)
    return {"ok": True}
```{% endraw %}

## Tarefa com dependências

{% raw %}```python
from fastapi import BackgroundTasks, Depends
from src.db import get_db

def cleanup_old_records(db=Depends(get_db)):
    db.query(Log).delete()

def GET(tasks: BackgroundTasks):
    tasks.add_task(cleanup_old_records)
    return {"status": "cleaning"}
```{% endraw %}

## Importante

- As tarefas são executadas **após** o envio da resposta — o cliente não espera
- Eles são executados no mesmo processo – tarefas longas bloqueiam o loop de eventos
- Para trabalhos pesados, use uma fila de tarefas (Celery, ARQ, RQ, etc.)
- Erros em tarefas são engolidos silenciosamente — adicione try/except dentro da função de tarefa
- As tarefas recebem **cópias** de objetos mutáveis — as mutações não afetarão a resposta