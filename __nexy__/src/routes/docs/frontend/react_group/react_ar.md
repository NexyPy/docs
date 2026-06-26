#تفاعل

أضف رد فعل إلى `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import react

class NexyConfig(NexyConfigModel):
    useFF = [react()]
```{% endraw %}

---

## إنشاء مكون

تتم معاملة الملفات ذات الامتداد `.tsx` أو `.jsx` في `src/` كمكونات React:

{% raw %}```tsx
// src/components/Counter.tsx
import { useState } from 'react'

export default function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  )
}
```{% endraw %}

---

## الاستخدام في صفحة .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

يتم تمرير الدعائم عبر بناء جملة Jinja2 `{{ '{{' }} {{ '}}' }}` — استخدم الأقواس المزدوجة لقيم JSON.

---

## محتوى الأطفال / الفتحة

يقوم Nexy بتمرير المحتوى الفرعي كدعم `children`. يمكن للمكون تقديمه:

{% raw %}```tsx
export default function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  )
}
```{% endraw %}

{% raw %}```nexy
<Card title="Hello">
  <p>This content is passed as children</p>
</Card>
```{% endraw %}

---

## الاشتراكية السوفياتية

يتم عرض مكونات React من جانب الخادم بنسبة `hydrateRoot`. يُنشئ الخادم HTML، ثم يقوم React بترطيب العميل. لا حاجة لتكوين إضافي.