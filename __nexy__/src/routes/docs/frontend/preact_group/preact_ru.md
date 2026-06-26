# Преакт

Добавьте Preact в свой `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import preact

class NexyConfig(NexyConfigModel):
    useFF = [preact()]
```{% endraw %}

---

## Создание компонента

Preact использует тот же API, что и React, но занимает меньше места:

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

## ССР

Preact автоматически отображается на сервере и гидратируется на клиенте.