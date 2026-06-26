# React

Add React to your `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import react

class NexyConfig(NexyConfigModel):
    useFF = [react()]
```{% endraw %}

---

## Creating a component

Files with `.tsx` or `.jsx` extension in `src/` are treated as React components:

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

Nexy passes child content as a `children` prop. The component can render it:

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

React components are server-side rendered with `hydrateRoot`. The server generates HTML, then React hydrates on the client. No extra configuration needed.