# الأسماء المستعارة

قم بتكوين الأسماء المستعارة لمسار الاستيراد لإجراء عمليات استيراد أكثر نظافة في ملفات `.nexy` الخاصة بك.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useAliases = {
        ""@": "src",
        ""@components": "src/components",
        ""@lib": "src/lib",
    }
```{% endraw %}

---

## الاستخدام

باستخدام التكوين أعلاه، بدلاً من:

{% raw %}```python
from src.components.card.nexy import Card
from src.lib.utils import format_date
```{% endraw %}

يمكنك الكتابة:

{% raw %}```python
from "@components/card.nexy import Card
from "@lib/utils import format_date
```{% endraw %}

---

## كيف يعمل

يتم حل الأسماء المستعارة في وقت الترجمة. تقوم مساحة اسم VFS بتعيين بادئات الأسماء المستعارة إلى مساراتها الموسعة. إنها تعمل في كل من عمليات استيراد المواد الأمامية واستدعاءات القالب `__Import`.

الرمز `"@` هو تقليد وليس شرطًا — يمكنك استخدام أي بادئة:

{% raw %}```python
useAliases = {
    "~": "src",
    "#components": "src/components",
}
```{% endraw %}

---

## القيود

- تعمل الأسماء المستعارة في ملفات `.nexy` و`.mdx` فقط
- **لا** تنطبق على عمليات استيراد JavaScript/TypeScript في مكونات العميل (استخدم الأسماء المستعارة للمسار `vite.config.ts` لذلك)
- يتم حل الأسماء المستعارة بالنسبة إلى جذر المشروع، وليس الملف الحالي

---

## مدمج مع الأسماء المستعارة لـ Vite

بالنسبة للمشاريع الكاملة، قم بتكوين كل من الأسماء المستعارة Nexy (لاستيرادات `.nexy`) والأسماء المستعارة لـ Vite (لاستيرادات JS/TS):

{% raw %}```python
# nexyconfig.py
useAliases = {""@": "src"}
```{% endraw %}

{% raw %}```ts
// vite.config.ts
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    resolve: {
        alias: { ""@": resolve(__dirname, "src") },
    },
});
```{% endraw %}