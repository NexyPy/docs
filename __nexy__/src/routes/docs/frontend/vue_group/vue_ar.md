# فيو

أضف Vue إلى `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import vue

class NexyConfig(NexyConfigModel):
    useFF = [vue()]
```{% endraw %}

---

## إنشاء مكون

يتم التعامل مع الملفات ذات الامتداد `.vue` كمكونات ملف واحد:

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

## الاستخدام في صفحة .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

يتم تمرير الدعائم عبر بناء جملة Jinja2 `{{ '{{' }} {{ '}}' }}` — استخدم الأقواس المزدوجة لقيم JSON.

---

## محتوى الأطفال / الفتحة

يقوم Nexy بتمرير محتوى الطفل باعتباره الفتحة الافتراضية:

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

## الاشتراكية السوفياتية

تستخدم مكونات Vue `createSSRApp` للترطيب. يتم ترطيب HTML المقدم من الخادم على العميل تلقائيًا.