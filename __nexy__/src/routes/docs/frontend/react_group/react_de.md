# Reagieren

Fügen Sie React zu Ihrem `nexyconfig.py` hinzu:

{% raw %}```python
from nexy.frontend import react

class NexyConfig(NexyConfigModel):
    useFF = [react()]
```{% endraw %}

---

## Eine Komponente erstellen

Dateien mit der Erweiterung `.tsx` oder `.jsx` in `src/` werden als React-Komponenten behandelt:

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

Nexy übergibt untergeordnete Inhalte als `children` Requisite. Die Komponente kann es rendern:

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

## SSR

React-Komponenten werden serverseitig mit `hydrateRoot` gerendert. Der Server generiert HTML und React hydriert dann auf dem Client. Keine zusätzliche Konfiguration erforderlich.