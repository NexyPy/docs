#ビュー

Vue を `nexyconfig.py` に追加します。

{% raw %}```python
from nexy.frontend import vue

class NexyConfig(NexyConfigModel):
    useFF = [vue()]
```{% endraw %}

---

## コンポーネントの作成

`.vue` 拡張子を持つファイルは単一ファイル コンポーネントとして扱われます。

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

## .nexy ページでの使用

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Props は、Jinja2 `{{ '{{' }} {{ '}}' }}` 構文を介して渡されます。JSON 値には二重中括弧を使用します。

---

## 子供 / スロットの内容

Nexy は子コンテンツをデフォルトのスロットとして渡します。

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

Vue コンポーネントは、水和に `createSSRApp` を使用します。サーバーでレンダリングされた HTML は、クライアント上で自動的にハイドレートされます。