# مهام الخلفية (وحدات)

قم بتشغيل الكود *بعد* إرسال الاستجابة في وحدات التحكم.

{% raw %}```python
from fastapi import BackgroundTasks
```{% endraw %}

## مهمة واحدة

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

## مهام متعددة

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

## مهمة مع DI

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

## مهم

- يتم تشغيل المهام **بعد** إرسال الرد — ولا ينتظر العميل
- تعمل في نفس العملية - المهام الطويلة تمنع حلقة الحدث
- بالنسبة للعمل الشاق، استخدم قائمة انتظار المهام (Celery، ARQ، RQ، وما إلى ذلك)
- يتم استيعاب الأخطاء في المهام بصمت — أضف محاولة/باستثناء داخل وظيفة المهمة
- تتلقى المهام **نسخًا** من الكائنات القابلة للتغيير — لن تؤثر الطفرات على الاستجابة