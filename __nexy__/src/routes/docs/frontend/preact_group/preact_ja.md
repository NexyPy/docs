# プリアクト

Preact を `nexyconfig.py` に追加します。

{% raw %}```python
from nexy.frontend import preact

class NexyConfig(NexyConfigModel):
    useFF = [preact()]
```{% endraw %}

---

## コンポーネントの作成

Preact は React と同じ API を使用しますが、フットプリントは小さくなります。

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

## .nexy ページでの使用

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Props は、Jinja2 `{{ '{{' }} {{ '}}' }}` 構文を介して渡されます。JSON 値には二重中括弧を使用します。

---

## 子供 / スロットの内容

Nexy は、子コンテンツを `children` プロパティとして渡します。

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

## SSR

Preact はサーバーでレンダリングされ、クライアント上で自動的にハイドレートされます。