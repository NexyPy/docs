# Вью

Добавьте Vue в свой `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import vue

class NexyConfig(NexyConfigModel):
    useFF = [vue()]
```{% endraw %}

---

## Создание компонента

Файлы с расширением `.vue` рассматриваются как однофайловые компоненты:

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

Nexy передает дочерний контент в качестве слота по умолчанию:

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

## ССР

Компоненты Vue используют `createSSRApp` для гидратации. HTML-код, отображаемый на сервере, автоматически гидратируется на клиенте.