# Твердый

Добавьте Solid в ваш `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import solid

class NexyConfig(NexyConfigModel):
    useFF = [solid()]
```{% endraw %}

---

## Создание компонента

Файлы с расширением `.tsx` или `.jsx`, используемые с сигналами твердого использования для состояния:

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

## Использование на странице .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Свойства передаются через синтаксис Jinja2 `{{ '{{' }} {{ '}}' }}` — используйте двойные фигурные скобки для значений JSON.

---

## Дети/содержимое слота

Nexy передает дочерний контент как свойство `children`:

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

## ССР

Solid использует `renderToString` для SSR и гидратирует с `hydrate` на клиенте.