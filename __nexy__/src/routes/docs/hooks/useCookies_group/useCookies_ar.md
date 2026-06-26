#استخدام ملفات تعريف الارتباط

إرجاع ملفات تعريف الارتباط من الطلب الحالي كقاموس.

{% raw %}```python
from nexy import useCookies

cookies = useCookies()
```{% endraw %}

---

## القيمة المرتجعة

`dict` — جميع ملفات تعريف الارتباط المرسلة مع الطلب.

---

## مثال

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
locale = cookies.get("nexy-locale", "en")
---
<html lang="{{ locale }}">
```{% endraw %}

---

## ملاحظات الاستخدام

- للقراءة فقط - استخدم `useSession` لإعداد ملفات تعريف الارتباط
- قيم ملفات تعريف الارتباط هي سلاسل
- يعادل `request.cookies` في FastAPI