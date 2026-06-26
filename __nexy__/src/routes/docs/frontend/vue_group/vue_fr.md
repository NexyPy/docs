#Vue

Ajoutez Vue à votre `nexyconfig.py` :

{% raw %}```python
from nexy.frontend import vue

class NexyConfig(NexyConfigModel):
    useFF = [vue()]
```{% endraw %}

---

## Création d'un composant

Les fichiers avec l'extension `.vue` sont traités comme des composants de fichier unique :

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

## Utilisation dans une page .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Les accessoires sont transmis via la syntaxe Jinja2 `{{ '{{' }} {{ '}}' }}` — utilisez des doubles accolades pour les valeurs JSON.

---

## Enfants / contenu des machines à sous

Nexy transmet le contenu enfant comme emplacement par défaut :

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

Les composants Vue utilisent `createSSRApp` pour l'hydratation. Le HTML rendu par le serveur est automatiquement hydraté sur le client.