#Vue

Fügen Sie Vue zu Ihrem `nexyconfig.py` hinzu:

{% raw %}```python
from nexy.frontend import vue

class NexyConfig(NexyConfigModel):
    useFF = [vue()]
```{% endraw %}

---

## Eine Komponente erstellen

Dateien mit der Erweiterung `.vue` werden als einzelne Dateikomponenten behandelt:

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

## Verwendung in einer .nexy-Seite

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Requisiten werden über die Jinja2 `{{ '{{' }} {{ '}}' }}`-Syntax übergeben – verwenden Sie doppelte geschweifte Klammern für JSON-Werte.

---

## Kinder-/Slot-Inhalte

Nexy übergibt untergeordnete Inhalte als Standard-Slot:

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

Vue-Komponenten verwenden `createSSRApp` zur Hydratation. Vom Server gerendertes HTML wird automatisch auf dem Client hydratisiert.