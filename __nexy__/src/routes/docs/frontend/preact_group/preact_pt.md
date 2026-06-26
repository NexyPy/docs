# Pré-agir

Adicione Preact ao seu `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import preact

class NexyConfig(NexyConfigModel):
    useFF = [preact()]
```{% endraw %}

---

## Criando um componente

Preact usa a mesma API do React, mas com uma pegada menor:

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

## Usando em uma página .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Os acessórios são passados ​​​​por meio da sintaxe Jinja2 `{{ '{{' }} {{ '}}' }}` - use colchetes duplos para valores JSON.

---

## Conteúdo infantil/slot

Nexy passa conteúdo filho como a propriedade `children`:

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

## RSS

O Preact é renderizado pelo servidor e hidratado no cliente automaticamente.