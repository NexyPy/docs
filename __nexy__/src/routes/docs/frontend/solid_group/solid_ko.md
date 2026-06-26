# 솔리드

`nexyconfig.py`에 Solid를 추가하세요:

{% raw %}```python
from nexy.frontend import solid

class NexyConfig(NexyConfigModel):
    useFF = [solid()]
```{% endraw %}

---

## 컴포넌트 생성

상태에 대한 Solid 사용 신호와 함께 사용되는 `.tsx` 또는 `.jsx` 확장자를 가진 파일:

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

## .nexy 페이지에서 사용

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

소품은 Jinja2 `{{ '{{' }} {{ '}}' }}` 구문을 통해 전달됩니다. JSON 값에는 이중 중괄호를 사용하세요.

---

## 어린이/슬롯 콘텐츠

Nexy는 하위 콘텐츠를 `children` prop으로 전달합니다.

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

Solid는 SSR에 `renderToString`를 사용하고 클라이언트에서는 `hydrate`로 수화물을 사용합니다.