# vista

Añade Vue a tu `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import vue

class NexyConfig(NexyConfigModel):
    useFF = [vue()]
```{% endraw %}

---

## Creando un componente

Los archivos con extensión `.vue` se tratan como componentes de un solo archivo:

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

## Usando en una página .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Los accesorios se pasan a través de la sintaxis `{{ '{{' }} {{ '}}' }}` de Jinja2: use llaves dobles para los valores JSON.

---

## Niños/contenido de tragamonedas

Nexy pasa el contenido infantil como espacio predeterminado:

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

Los componentes de Vue utilizan `createSSRApp` para la hidratación. El HTML renderizado por el servidor se hidrata automáticamente en el cliente.