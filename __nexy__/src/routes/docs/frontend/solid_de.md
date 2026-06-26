# Solid

Add Solid to your `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import solid

class NexyConfig(NexyConfigModel):
    useFF = [solid()]
```{% endraw %}

---

## Creating a component

Files with `.tsx` or `.jsx` extension used with Solid use signals for state:

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

## Using in a .nexy page

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Props are passed via Jinja2 `{{ '{{' }} {{ '}}' }}` syntax — use double braces for JSON values.

---

## Children / slot content

Nexy passes child content as the `children` prop:

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

Solid uses `renderToString` for SSR and hydrates with `hydrate` on the client.