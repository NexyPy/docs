# Sólido

Agregue Sólido a su `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import solid

class NexyConfig(NexyConfigModel):
    useFF = [solid()]
```{% endraw %}

---

## Creando un componente

Archivos con extensión `.tsx` o `.jsx` usados con señales de uso sólido para el estado:

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

Sólido utiliza `renderToString` para SSR e hidrata con `hydrate` en el cliente.