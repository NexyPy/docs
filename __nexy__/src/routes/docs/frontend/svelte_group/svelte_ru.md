# Стройность

Добавьте Svelte в свой `nexyconfig.py`:

{% raw %}```python
from nexy.frontend import svelte

class NexyConfig(NexyConfigModel):
    useFF = [svelte()]
```{% endraw %}

---

## Создание компонента

Файлы с расширением `.svelte` рассматриваются как компоненты Svelte:

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

## Использование на странице .nexy

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

Свойства передаются через синтаксис Jinja2 `{{ '{{' }} {{ '}}' }}` — используйте двойные фигурные скобки для значений JSON.

---

## Дети/содержимое слота

Nexy передает дочерний контент как слоты Svelte:

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

## ССР

Компоненты Svelte используют `hydrate`, когда сервер предварительно отрисовал HTML, или `mount` для рендеринга только для клиента.