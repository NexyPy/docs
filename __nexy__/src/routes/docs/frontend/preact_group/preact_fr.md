# Préagir

Ajoutez Preact à votre `nexyconfig.py` :

{% raw %}```python
from nexy.frontend import preact

class NexyConfig(NexyConfigModel):
    useFF = [preact()]
```{% endraw %}

---

## Création d'un composant

Preact utilise la même API que React mais avec un encombrement réduit :

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

## Utilisation dans une page .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Les accessoires sont transmis via la syntaxe Jinja2 `{{ '{{' }} {{ '}}' }}` — utilisez des doubles accolades pour les valeurs JSON.

---

## Enfants / contenu des machines à sous

Nexy transmet le contenu enfant en tant qu'accessoire `children` :

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

Preact est rendu sur le serveur et automatiquement hydraté sur le client.