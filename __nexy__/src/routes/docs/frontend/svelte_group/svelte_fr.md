# Svelte

Ajoutez Svelte à votre `nexyconfig.py` :

{% raw %}```python
from nexy.frontend import svelte

class NexyConfig(NexyConfigModel):
    useFF = [svelte()]
```{% endraw %}

---

## Création d'un composant

Les fichiers avec l'extension `.svelte` sont traités comme des composants Svelte :

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

Nexy transmet le contenu enfant en tant que machines à sous Svelte :

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

Les composants Svelte utilisent `hydrate` lorsque le serveur a du HTML pré-rendu, ou `mount` pour le rendu client uniquement.