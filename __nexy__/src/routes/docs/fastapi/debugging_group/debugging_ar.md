# التصحيح

تطبيقات Nexy هي تطبيقات Python القياسية - استخدم أدوات تصحيح الأخطاء المعتادة.

## `breakpoint()`

أدخل `breakpoint()` في أي مكان في معالج المسار الخاص بك:

{% raw %}```python
def GET():
    x = 42
    breakpoint()  # drops into pdb
    return {"x": x}
```{% endraw %}

قم بتشغيل `nx dev` واضغط على المسار — تنخفض المحطة إلى `pdb`.

## كود VS

1. قم بتعيين نقاط التوقف في VS Code بالنقر فوق الحضيض
2. قم بإنشاء `.vscode/launch.json`:

{% raw %}```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Nexy Dev",
            "type": "debugpy",
            "request": "launch",
            "module": "nexy.cli",
            "args": ["dev"],
            "jinja": true
        }
    ]
}
```{% endraw %}

3. اضغط على `F5` لبدء تصحيح الأخطاء - تعمل نقاط التوقف في ملفات `.nexy` و`.py`.

## تصحيح أخطاء الطباعة

{% raw %}```python
---
print(f"Request params: {params}")  # appears in the terminal
---
```{% endraw %}

## تسجيل وحدة التحكم

يقوم Nexy بتسجيل كافة الطلبات المقدمة إلى الجهاز بشكل افتراضي. أضف سجلاتك الخاصة:

{% raw %}```python
import logging
logger = logging.getLogger("nexy")

def GET():
    logger.info("Home page loaded")
    return {"ok": True}
```{% endraw %}

## إعادة تحميل يوفيكرن

يقوم `nx dev` بتشغيل uvicorn مع `--reload` — التغييرات في ملفات `.py`، `.nexy`، `.mdx` تؤدي إلى إعادة التشغيل التلقائي.

## القضايا المشتركة

| العَرَض | السبب المحتمل |
|---------|------------|
| يعود الطريق 405 | طريقة HTTP خاطئة أو مفقودة `python-multipart` |
| الجسم `None` | نموذج Pydantic مفقود أو تعليق توضيحي للنوع |
| 422 خطأ في التحقق | اكتب عدم تطابق في معلمات المسار/الاستعلام |
| لم يتم العثور على الوحدة النمطية | ذاكرة التخزين المؤقت لـ VFS قديمة — أعد تشغيل `nx dev` |