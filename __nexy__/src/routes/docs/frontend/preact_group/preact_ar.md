#بريكت

أضف Preact إلى `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import preact

class NexyConfig(NexyConfigModel):
    useFF = [preact()]
```{% endraw %}

---

## إنشاء مكون

يستخدم Preact نفس واجهة برمجة التطبيقات التي تستخدمها React ولكن بمساحة أصغر:

{% raw %}```tsx
// src/components/Counter.tsx
import { useState } from 'preact/hooks'

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

يقوم Nexy بتمرير المحتوى الفرعي باعتباره الخاصية `children`:

{% raw %}```tsx
export default function Card({ title, children }) {
  return (
    <div class="card">
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

يتم عرض Preact بواسطة الخادم وترطيبه على العميل تلقائيًا.