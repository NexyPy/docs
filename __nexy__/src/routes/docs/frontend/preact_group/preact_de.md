# Vorwirken

Fügen Sie Preact zu Ihrem `nexyconfig.py` hinzu:

{% raw %}```python
from nexy.frontend import preact

class NexyConfig(NexyConfigModel):
    useFF = [preact()]
```{% endraw %}

---

## Eine Komponente erstellen

Preact verwendet dieselbe API wie React, jedoch mit einem geringeren Platzbedarf:

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

## Verwendung in einer .nexy-Seite

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Requisiten werden über die Jinja2 `{{ '{{' }} {{ '}}' }}`-Syntax übergeben – verwenden Sie doppelte geschweifte Klammern für JSON-Werte.

---

## Kinder-/Slot-Inhalte

Nexy übergibt untergeordnete Inhalte als `children`-Requisite:

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

## SSR

Preact wird automatisch vom Server gerendert und auf dem Client hydratisiert.