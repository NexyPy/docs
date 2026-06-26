# الصفحات

الصفحة عبارة عن مسار يُرجع HTML. في Nexy، تكون الصفحات عبارة عن ملفات `.nexy` أو `.mdx` ضمن `src/routes/`.

> تختلف الصفحات عن **معالجات التوجيه** (ملفات `.py`) التي تعرض بيانات JSON أو بيانات أولية.

---

## إنشاء صفحة

ضع ملف `.nexy` أو `.mdx` في `src/routes/`:
{% raw %}```bash
src/
└── routes/
    └── index.nexy       →  /
```{% endraw %}
{% raw %}```html
<!-- index.nexy -->
<h1>Hello Nexy!</h1>
```{% endraw %}
ليست هناك حاجة لتسجيل المسار — الملف **هو** المسار.

---

## الصفحات في `.nexy`

يمكن أن يحتوي الملف `.nexy` على مادة Python الأمامية وقالب HTML:
{% raw %}```
---
items: prop[list] = []
---
<ul>
{% for item in items %}
    {{ item }}
{% endfor %}
</ul>
```{% endraw %}
---

## الصفحات في `.mdx`

تجمع ملفات `.mdx` بين Markdown ومكونات Nexy:
{% raw %}```mdx
---
from "@components/link.nexy" import Link
---

# My Article

<Link href="/docs">Back to docs</Link>
```{% endraw %}
هذه الصفحة التي تقرأها هي في حد ذاتها ملف `.mdx` — يتم التعامل مع جدول المحتويات والشريط الجانبي ومسار التنقل من خلال التخطيط.

---

## ملفات خاصة غير قابلة للتوجيه

بعض الملفات الموجودة داخل `routes/` لا تنشئ مسارات:

| ملف | الدور |
|---|---|
| `__init__.py` | علامة حزمة بايثون |
| `layout.nexy` | غلاف التخطيط المشترك |
| `dependencies.py` | التبعيات المشتركة |
{% call Link(href="/docs/fbrouters/layouts") %}Next: Layouts →{% endcall %}