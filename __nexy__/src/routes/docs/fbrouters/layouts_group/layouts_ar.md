# التخطيطات

التخطيط هو ملف `layout.nexy` يقوم بتغليف كافة الصفحات الموجودة في الدليل الخاص به. يمنع تكرار نفس الرأس أو الشريط الجانبي أو التذييل في كل صفحة.

---

## كيف يعمل

ضع `layout.nexy` داخل دليل `routes/`. يقوم Nexy بتطبيقه تلقائيًا على جميع الصفحات الشقيقة (دون إنشاء مسار نفسه):
{% raw %}```bash
routes/
├── layout.nexy           ← Applied to / and /about
├── index.nexy
├── about.nexy
└── blog/
    ├── layout.nexy       ← Applied to /blog/...
    ├── index.nexy
    └── [slug].nexy
```{% endraw %}
---

## بناء الجملة

يتلقى التخطيط محتواه الفرعي عبر `children:prop[str]`:
{% raw %}```
---
children: prop[str]
---
<header class="site-header">
    <nav>...</nav>
</header>
{{ children | safe }}
<footer>...</footer>
```{% endraw %}
---

## تخطيطات متداخلة

تتداخل التخطيطات بشكل هرمي. الصفحة في `blog/[slug].nexy` تتلقى `blog/layout.nexy` أولاً، ثم الجذر `layout.nexy`:
{% raw %}```bash
routes/
├── layout.nexy           ← Global layout (header, footer)
└── blog/
    ├── layout.nexy       ← Blog layout (category sidebar)
    └── [slug].nexy       ← Page → blog/layout → root/layout
```{% endraw %}
---

## مثال من العالم الحقيقي

يستخدم تخطيط هذه المستندات (`src/routes/docs/layout.nexy`) `usePathname`، و`Sidebar`، و`Table_of_contents`:
{% raw %}```python
from nexy import usePathname
from "@components/docs/sidebar.nexy" import Sidebar
from "@components/docs/table_of_contents.nexy" import Table_of_contents
```{% endraw %}
{% raw %}```html
<main>
    <Sidebar />
    {{ children | safe }}
    <Table_of_contents />
</main>
```{% endraw %}
{% call Link(href="/docs/fbrouters/dependencies") %}Next: Dependencies →{% endcall %}