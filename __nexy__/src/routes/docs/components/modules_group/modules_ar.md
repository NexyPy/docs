#نظام الوحدة

يتيح لك نظام وحدة Nexy استيراد المكونات وتصديرها عبر مشروعك.

---

## استيراد مكون

استخدم بناء الجملة `import` في المادة الأمامية:

{% raw %}```python
---
from "@components/card.nexy" import Card
from "@components/button.nexy" import Button
---
```{% endraw %}

يتحول الاسم المستعار `"@` إلى `src/` (قابل للتكوين في `nexyconfig.py`).

---

## الصادرات المسماة

افتراضيًا، يقوم الملف `.nexy` بتصدير القالب الخاص به كمكون مسمى باسم الملف:

| ملف | اسم التصدير |
|---|---|
| `card.nexy` | `Card` |
| `button.nexy` | `Button` |
| `table_of_contents.nexy` | `Table_of_contents` |

---

## فتحة (الأطفال)

يعرض المكون `Slot` المحتوى الفرعي الذي تم تمريره بين علامات الفتح/الإغلاق:

{% raw %}```nexy
<div class="card">
    {{ title }}
    <Slot />
</div>
```{% endraw %}

الاستخدام:

{% raw %}```html
<Card title="Hello">
    <p>This goes into the Slot.</p>
</Card>
```{% endraw %}

---

## استيراد الأسماء المستعارة

استخدم `as` لتجنب تعارض الأسماء:

{% raw %}```python
---
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
---
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

---

## إعادة التصدير

قم بإنشاء ملف فهرس يجمع المكونات:

{% raw %}```python
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

يتم استيراد الملفات الأخرى من هذا البرميل:

{% raw %}```python
---
from "@components/index.nexy" import Card, Button
---
```{% endraw %}

-----

## الواردات الديناميكية

بالنسبة لأطر العمل من جانب العميل (React وSolid)، يقوم Nexy بإنشاء شجرة الاستيراد تلقائيًا أثناء الإنشاء. لا تحتاج إلى إدارة نقاط الإدخال يدويًا - يكتشف المترجم استخدام `.tsx`/`.jsx` ويقوم بتوصيل Vite أو esbuild وفقًا لذلك.