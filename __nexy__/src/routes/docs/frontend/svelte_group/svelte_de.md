# Schlank

Fügen Sie Svelte zu Ihrem `nexyconfig.py` hinzu:

{% raw %}```python
from nexy.frontend import svelte

class NexyConfig(NexyConfigModel):
    useFF = [svelte()]
```{% endraw %}

---

## Eine Komponente erstellen

Dateien mit der Erweiterung `.svelte` werden als Svelte-Komponenten behandelt:

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

Nexy übergibt untergeordnete Inhalte als Svelte-Slots:

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

Svelte-Komponenten verwenden `hydrate`, wenn der Server HTML vorgerendert hat, oder `mount` für reines Client-Rendering.