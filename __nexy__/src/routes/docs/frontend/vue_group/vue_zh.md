# 视图

将 Vue 添加到您的`nexyconfig.py`：

{% raw %}```python
from nexy.frontend import vue

class NexyConfig(NexyConfigModel):
    useFF = [vue()]
```{% endraw %}

---

## 创建组件

扩展名为 `.vue` 的文件被视为单文件组件：

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

Nexy 将子内容作为默认槽传递：

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

## 服务端SR

Vue 组件使用 `createSSRApp` 进行水合作用。服务器渲染的 HTML 会在客户端自动进行水合。