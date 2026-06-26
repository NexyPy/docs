# スヴェルト

Svelte を `nexyconfig.py` に追加します:

{% raw %}```python
from nexy.frontend import svelte

class NexyConfig(NexyConfigModel):
    useFF = [svelte()]
```{% endraw %}

---

## コンポーネントの作成

`.svelte` 拡張子を持つファイルは Svelte コンポーネントとして扱われます。

{% raw %}```svelte
<!-- src/components/Counter.svelte -->
<script>
  export let initial = 0
  let count = initial
</script>

<div>
  <p>Count: {count}</p>
  <button on:click={() => count += 1}>+</button>
</div>
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

Nexy は子コンテンツを Svelte スロットとして渡します。

{% raw %}```svelte
<!-- Card.svelte -->
<script>
  export let title
</script>

<div class="card">
  <h2>{title}</h2>
  <slot />
</div>
```{% endraw %}

{% raw %}```nexy
<Card title="Hello">
  <p>This content is passed as a slot</p>
</Card>
```{% endraw %}

---

## SSR

Svelte コンポーネントは、サーバーが HTML を事前レンダリングしている場合は `hydrate` を使用し、クライアントのみのレンダリングの場合は `mount` を使用します。