#استخدام المشاهدات

يعرض قالب عرض (`.nexy`، `.mdx`، أو مكون الواجهة الأمامية) مع سياق معين، ويعيد `HTMLResponse`.

{% raw %}```python
from nexy import useViews

html = useViews(path, context=None)
```{% endraw %}

---

## المعلمات

| المعلمة | اكتب | الافتراضي | الوصف |
|-----------|------|--------|-------------|
| `path` | `str` | مطلوب | المسار إلى ملف العرض (بالنسبة للمشروع) |
| `context` | `dict \| None` | `None` | المتغيرات لتمريرها إلى القالب |

---

## القيمة المرتجعة

`HTMLResponse` — HTML المعروض مع إدخال أصول Vite.

---

## مثال

{% raw %}```nexy
---
from nexy import useViews
html = useViews("src/routes/components/card.nexy", {"title": "Hello", "body": "World"})
---
{{ html | safe }}
```{% endraw %}

---

## مكونات الواجهة الأمامية

بالنسبة إلى طرق العرض `.tsx` و`.vue` و`.svelte` و`.jsx`، تقوم `useViews` بإرجاع حاوية قابلة للترطيب:

{% raw %}```nexy
---
from nexy import useViews
container = useViews("src/components/Counter.tsx", {"initial": 0})
---
{{ container | safe }}
```{% endraw %}

تشتمل الحاوية على سمات `data-nexy-fw` و`data-nexy-path` و`data-nexy-props` للترطيب من جانب العميل.

---

## الإضافات المدعومة

| ملحق | السلوك |
|-----------|----------|
| `.nexy` | قالب مجمع → تقديم HTML |
| `.mdx` | تخفيض السعر + المكونات → تقديم HTML |
| `.tsx` | حاوية قابلة للترطيب (متفاعل/صلب/برياكت) |
| `.vue` | حاوية قابلة للترطيب |
| `.svelte` | حاوية قابلة للترطيب |
| `.jsx` | حاوية قابلة للترطيب |