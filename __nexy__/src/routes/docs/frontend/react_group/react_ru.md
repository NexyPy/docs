# Реагировать

Добавьте React к вашему `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import react

class NexyConfig(NexyConfigModel):
    useFF = [react()]
```{% endraw %}

---

## Создание компонента

Файлы с расширением `.tsx` или `.jsx` в `src/` рассматриваются как компоненты React:

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

Nexy передает дочерний контент как свойство `children`. Компонент может отображать его:

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

## ССР

Компоненты React отображаются на стороне сервера с помощью `hydrateRoot`. Сервер генерирует HTML, а затем React обрабатывает его на клиенте. Никакой дополнительной настройки не требуется.