# Preactuar

Agregue Preact a su `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import preact

class NexyConfig(NexyConfigModel):
    useFF = [preact()]
```{% endraw %}

---

## Creando un componente

Preact usa la misma API que React pero con una huella más pequeña:

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

## Usando en una página .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Los accesorios se pasan a través de la sintaxis `{{ '{{' }} {{ '}}' }}` de Jinja2: use llaves dobles para los valores JSON.

---

## Niños/contenido de tragamonedas

Nexy pasa el contenido secundario como `children` prop:

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

Preact se renderiza en el servidor y se hidrata automáticamente en el cliente.