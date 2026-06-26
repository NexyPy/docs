# اسم المسار

إرجاع مسار URL الحالي كسلسلة.

{% raw %}```python
from nexy import usePathname

pathname = usePathname()
```{% endraw %}

---

## القيمة المرتجعة

`str` — مكون المسار لعنوان URL للطلب الحالي (على سبيل المثال `/docs/hooks/usePathname`).

---

## مثال

{% raw %}```nexy
---
from nexy import usePathname
path = usePathname()
---
<nav class="breadcrumb">
    {% set segments = path.strip('/').split('/') %}
    {% for seg in segments %}
        <span>/ {{ seg }}</span>
    {% endfor %}
</nav>
```{% endraw %}

---

## ملاحظات الاستخدام

- متوفر في المادة الأمامية `.nexy` و`.mdx`
- متوفر أيضًا في معالجات المسار `.py` عبر `request.url.path`
- يُرجع المسار فقط - بدون سلسلة استعلام أو جزء