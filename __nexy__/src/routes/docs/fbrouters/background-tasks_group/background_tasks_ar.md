# مهام الخلفية (FBR)

قم بتشغيل التعليمات البرمجية *بعد* إرسال الاستجابة — للتسجيل والإشعارات وتدفئة ذاكرة التخزين المؤقت.

{% raw %}```python
from fastapi import BackgroundTasks
```{% endraw %}

## مهمة واحدة

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

## مهام متعددة

{% raw %}```python
from fastapi import BackgroundTasks

def GET(tasks: BackgroundTasks):
    tasks.add_task(log_visit)
    tasks.add_task(notify_admin)
    tasks.add_task(warm_cache)
    return {"ok": True}
```{% endraw %}

## المهمة مع التبعيات

{% raw %}```python
from fastapi import BackgroundTasks, Depends
from src.db import get_db

def cleanup_old_records(db=Depends(get_db)):
    db.query(Log).delete()

def GET(tasks: BackgroundTasks):
    tasks.add_task(cleanup_old_records)
    return {"status": "cleaning"}
```{% endraw %}

## مهم

- يتم تشغيل المهام **بعد** إرسال الرد — ولا ينتظر العميل
- تعمل في نفس العملية - المهام الطويلة تمنع حلقة الحدث
- بالنسبة للعمل الشاق، استخدم قائمة انتظار المهام (Celery، ARQ، RQ، وما إلى ذلك)
- يتم استيعاب الأخطاء في المهام بصمت — أضف محاولة/باستثناء داخل وظيفة المهمة
- تتلقى المهام **نسخًا** من الكائنات القابلة للتغيير — لن تؤثر الطفرات على الاستجابة