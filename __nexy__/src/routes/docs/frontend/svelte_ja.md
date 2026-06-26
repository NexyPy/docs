# Svelte

Add Svelte to your `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import svelte

class NexyConfig(NexyConfigModel):
    useFF = [svelte()]
```{% endraw %}

---

## Creating a component

Files with `.svelte` extension are treated as Svelte components:

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

Nexy passes child content as Svelte slots:

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

Svelte components use `hydrate` when the server has pre-rendered HTML, or `mount` for client-only rendering.