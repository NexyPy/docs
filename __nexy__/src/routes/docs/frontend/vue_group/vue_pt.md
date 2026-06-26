#Vue

Adicione Vue ao seu `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import vue

class NexyConfig(NexyConfigModel):
    useFF = [vue()]
```{% endraw %}

---

## Criando um componente

Arquivos com extensão `.vue` são tratados como componentes de arquivo único:

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

## Usando em uma página .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Os acessórios são passados ​​​​por meio da sintaxe Jinja2 `{{ '{{' }} {{ '}}' }}` - use colchetes duplos para valores JSON.

---

## Conteúdo infantil/slot

Nexy passa conteúdo filho como slot padrão:

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

## RSS

Os componentes Vue usam `createSSRApp` para hidratação. O HTML renderizado pelo servidor é hidratado no cliente automaticamente.