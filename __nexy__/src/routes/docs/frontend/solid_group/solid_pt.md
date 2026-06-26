# Sólido

Adicione Sólido ao seu `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import solid

class NexyConfig(NexyConfigModel):
    useFF = [solid()]
```{% endraw %}

---

## Criando um componente

Arquivos com extensão `.tsx` ou `.jsx` usados com Solid usam sinais para estado:

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

## RSS

Solid usa `renderToString` para SSR e hidrata com `hydrate` no cliente.