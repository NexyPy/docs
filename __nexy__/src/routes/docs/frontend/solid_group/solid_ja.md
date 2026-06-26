# ソリッド

Solid を `nexyconfig.py` に追加します。

{% raw %}```python
from nexy.frontend import solid

class NexyConfig(NexyConfigModel):
    useFF = [solid()]
```{% endraw %}

---

## コンポーネントの作成

Solid で使用される `.tsx` または `.jsx` 拡張子のファイルは、状態の信号を使用します。

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

## SSR

Solid は SSR に `renderToString` を使用し、クライアントの `hydrate` で水和します。