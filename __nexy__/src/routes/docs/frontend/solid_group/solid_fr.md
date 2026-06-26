# Solide

Ajoutez Solid à votre `nexyconfig.py` :

{% raw %}```python
from nexy.frontend import solid

class NexyConfig(NexyConfigModel):
    useFF = [solid()]
```{% endraw %}

---

## Création d'un composant

Fichiers avec l'extension `.tsx` ou `.jsx` utilisés avec des signaux d'utilisation solide pour l'état :

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

Solid utilise `renderToString` pour SSR et hydrate avec `hydrate` sur le client.