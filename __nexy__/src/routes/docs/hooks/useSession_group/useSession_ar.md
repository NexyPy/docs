# جلسة الاستخدام

إرجاع قاموس الجلسة للطلب الحالي. يتم دعم الجلسات بواسطة ملفات تعريف الارتباط الموقعة - ولا يوجد تخزين على جانب الخادم.

{% raw %}```python
from nexy import useSession

session = useSession()
```{% endraw %}

---

## القيمة المرتجعة

`dict` — بيانات الجلسة من ملف تعريف الارتباط الموقع. إرجاع إملاء فارغ في حالة عدم وجود جلسة.

---

## مثال

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
user_id = session.get("user_id")
---
{% if user_id %}
    <p>Logged in as user {{ user_id }}</p>
{% else %}
    <p>Guest</p>
{% endif %}
```{% endraw %}

---

## كتابة بيانات الجلسة

{% raw %}```python
session = useSession()
session["user_id"] = 123
session["role"] = "admin"
del session["_flash"]
```{% endraw %}

---

## نمط رسائل فلاش

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append("Item saved!")
session["_flashes"] = flashes
```{% endraw %}

---

## ملاحظات الاستخدام

- يتطلب تكوين `useSession` في `nexyconfig.py`
- بيانات الجلسة موقعة ولكنها **غير مشفرة**
- لا يوجد تخزين على جانب الخادم - كل شيء موجود في ملف تعريف الارتباط