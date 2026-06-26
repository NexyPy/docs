#استخدامجهاز التوجيه

إرجاع كائن مع سياق التوجيه للطلب الحالي.

{% raw %}```python
from nexy import useRouter

router = useRouter()
```{% endraw %}

---

## القيمة المرتجعة

`dict` بالمفاتيح التالية:

| مفتاح | اكتب | الوصف |
|-----|------|-------------|
| `path` | `str` | مسار URL الحالي |
| `base_url` | `str` | عنوان URL الأساسي للخادم |
| `url_for` | `callable \| None` | وظيفة FastAPI `url_for` للبحث العكسي عن عنوان URL |

---

## مثال

{% raw %}```nexy
---
from nexy import useRouter
router = useRouter()
---
<p>Current path: {{ router.path }}</p>
<p>Base URL: {{ router.base_url }}</p>
```{% endraw %}

---

## البحث العكسي عن URL

{% raw %}```python
router = useRouter()
if router.url_for:
    url = router.url_for("read_article", slug="hello-world")
```{% endraw %}

---

## ملاحظات الاستخدام

- قد يكون `url_for` `None` خارج سياق الطلب
- يستخدم `request.app.url_for` الخاص بـ FastAPI أسفل الغطاء