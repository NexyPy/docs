# Vue

Add Vue to your `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import vue

class NexyConfig(NexyConfigModel):
    useFF = [vue()]
```{% endraw %}

---

## Creating a component

Files with `.vue` extension are treated as single-file components:

{% raw %}```vue
<!-- src/components/Counter.vue -->
<script setup>
import { ref } from 'vue'
const props = defineProps({ initial: { type: Number, default: 0 } })
const count = ref(props.initial)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button "@click="count++">+</button>
  </div>
</template>
```{% endraw %}

---

## Using in a .nexy page

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Props are passed via Jinja2 `{{ '{{' }} {{ '}}' }}` syntax — use double braces for JSON values.

---

## Children / slot content

Nexy passes child content as the default slot:

{% raw %}```vue
<!-- Card.vue -->
<template>
  <div class="card">
    {{ title }}
    <slot />
  </div>
</template>
```{% endraw %}

{% raw %}```nexy
<Card title="Hello">
  <p>This content is passed as the default slot</p>
</Card>
```{% endraw %}

---

## SSR

Vue components use `createSSRApp` for hydration. Server-rendered HTML is hydrated on the client automatically.