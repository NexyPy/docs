# Фоновые задачи (модульные)

Запустите код *после* отправки ответа в контроллерах.

{% raw %}```python
from fastapi import BackgroundTasks
```{% endraw %}

## Одна задача

{% raw %}```python
from nexy.decorators import Controller
from fastapi import BackgroundTasks

def send_email(email: str, body: str):
    ...

"@Controller("/contact")
class ContactController:
    def post(self, data: ContactForm, tasks: BackgroundTasks):
        tasks.add_task(send_email, data.email, "Thanks!")
        return {"status": "sent"}
```{% endraw %}

## Несколько задач

{% raw %}```python
from fastapi import BackgroundTasks
from nexy.decorators import Controller

"@Controller("/dashboard")
class DashboardController:
    def get(self, tasks: BackgroundTasks):
        tasks.add_task(log_visit)
        tasks.add_task(notify_admin)
        tasks.add_task(warm_cache)
        return {"ok": True}
```{% endraw %}

## Задача с DI

{% raw %}```python
from fastapi import BackgroundTasks
from nexy.decorators import Controller, Injectable
from src.db import Database

"@Injectable()
class Logger:
    def write(self, msg: str):
        ...

"@Controller("/logs")
class LogController:
    def __init__(self, logger: Logger, tasks: BackgroundTasks):
        self.logger = logger
        self.tasks = tasks

    def post(self):
        self.tasks.add_task(self.logger.write, "action logged")
        return {"ok": True}
```{% endraw %}

## Важно

- Задачи запускаются **после** отправки ответа — клиент не ждет
- Они выполняются в одном процессе — длинные задачи блокируют цикл событий.
- Для тяжелой работы используйте очередь задач (Celery, ARQ, RQ и т. д.)
— Ошибки в задачах проглатываются молча — добавьте try/Exception внутри функции задачи.
- Задачи получают **копии** изменяемых объектов — мутации не влияют на ответ.