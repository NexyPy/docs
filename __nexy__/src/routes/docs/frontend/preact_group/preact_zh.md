# 预反应

将 Preact 添加到您的 `nexyconfig.py`：

{% raw %}```python
from nexy.frontend import preact

class NexyConfig(NexyConfigModel):
    useFF = [preact()]
```{% endraw %}

---

## 创建组件

Preact 使用与 React 相同的 API，但占用空间更小：

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

## 在 .nexy 页面中使用

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Props 通过 Jinja2 `{{ '{{' }} {{ '}}' }}` 语法传递 - 对 JSON 值使用双括号。

---

## 儿童/老虎机内容

Nexy 将子内容作为 `children` 属性传递：

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

## 服务端SR

Preact 由服务器渲染并在客户端自动进行水合。