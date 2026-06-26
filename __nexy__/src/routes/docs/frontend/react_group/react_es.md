# reaccionar

Agrega React a tu `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import react

class NexyConfig(NexyConfigModel):
    useFF = [react()]
```{% endraw %}

---

## Creando un componente

Los archivos con extensión `.tsx` o `.jsx` en `src/` se tratan como componentes de React:

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

Nexy pasa el contenido secundario como un accesorio `children`. El componente puede renderizarlo:

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

## RSS

Los componentes de React se renderizan en el lado del servidor con `hydrateRoot`. El servidor genera HTML, luego React se hidrata en el cliente. No se necesita configuración adicional.