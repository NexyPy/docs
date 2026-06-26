# Esbelto

Adicione Svelte ao seu `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import svelte

class NexyConfig(NexyConfigModel):
    useFF = [svelte()]
```{% endraw %}

---

## Criando um componente

Arquivos com extensão `.svelte` são tratados como componentes Svelte:

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

Nexy passa conteúdo filho como slots Svelte:

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

## RSS

Os componentes Svelte usam `hydrate` quando o servidor tem HTML pré-renderizado ou `mount` para renderização somente do cliente.