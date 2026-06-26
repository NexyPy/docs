# استعلام الاستخدام

إرجاع معلمات المسار الديناميكي (معلمات المسار) من عنوان URL الحالي.

{% raw %}```python
from nexy import useQuery

query = useQuery()
```{% endraw %}

---

## القيمة المرتجعة

`dict` — معلمات المسار المستخرجة من عنوان URL (على سبيل المثال `{"slug": "hello-world"}` لمسار `[slug]`).

---

## مثال

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<h1>Article: {{ params.slug }}</h1>
```{% endraw %}

---

## مع معلمات متعددة

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<article>
    {{ params.title }}
    <p>Year: {{ params.year }}, Month: {{ params.month }}</p>
</article>
```{% endraw %}

---

## ملاحظات الاستخدام

- القيم هي سلاسل افتراضيًا - ينطبق تحويل نوع FastAPI في معالجات `.py`
- يعادل `request.path_params` في FastAPI