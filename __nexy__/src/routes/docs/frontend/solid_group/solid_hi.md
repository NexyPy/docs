#ठोस

अपने `nexyconfig.py` में सॉलिड जोड़ें:

{% raw %}```python
from nexy.frontend import solid

class NexyConfig(NexyConfigModel):
    useFF = [solid()]
```{% endraw %}

---

## एक घटक बनाना

`.tsx` या `.jsx` एक्सटेंशन वाली फ़ाइलें राज्य के लिए ठोस उपयोग संकेतों के साथ उपयोग की जाती हैं:

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

## .nexy पेज में उपयोग करना

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

प्रॉप्स को Jinja2 `{{ '{{' }} {{ '}}' }}` सिंटैक्स के माध्यम से पारित किया जाता है - JSON मानों के लिए डबल ब्रेसिज़ का उपयोग करें।

---

## बच्चे/स्लॉट सामग्री

नेक्सी चाइल्ड कंटेंट को `children` प्रोप के रूप में पास करता है:

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

## एसएसआर

सॉलिड एसएसआर के लिए `renderToString` का उपयोग करता है और क्लाइंट पर `hydrate` के साथ हाइड्रेट करता है।