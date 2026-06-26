# Solide

Fügen Sie Solid zu Ihrem `nexyconfig.py` hinzu:

{% raw %}```python
from nexy.frontend import solid

class NexyConfig(NexyConfigModel):
    useFF = [solid()]
```{% endraw %}

---

## Eine Komponente erstellen

Dateien mit der Erweiterung `.tsx` oder `.jsx`, die mit Solid-Use-Signalen für den Status verwendet werden:

{% raw %}```tsx
// src/components/Counter.tsx
import { createSignal } from 'solid-js'

export default function Counter({ initial = 0 }) {
  const [count, setCount] = createSignal(initial)
  return (
    <div>
      <p>Count: {count()}</p>
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
export default function Card(props) {
  return (
    <div class="card">
      <h2>{props.title}</h2>
      <div>{props.children}</div>
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

Solid verwendet `renderToString` für SSR und hydratisiert mit `hydrate` auf dem Client.