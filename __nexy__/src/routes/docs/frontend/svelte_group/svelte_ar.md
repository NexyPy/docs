# رشيقة

أضف Svelte إلى `nexyconfig.py` الخاص بك:

{% raw %}```python
from nexy.frontend import svelte

class NexyConfig(NexyConfigModel):
    useFF = [svelte()]
```{% endraw %}

---

## إنشاء مكون

يتم التعامل مع الملفات ذات الامتداد `.svelte` كمكونات Svelte:

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

يقوم Nexy بتمرير المحتوى الفرعي كفتحات Svelte:

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

## الاشتراكية السوفياتية

تستخدم مكونات Svelte `hydrate` عندما يكون الخادم قد قام بعرض HTML مسبقًا، أو `mount` للعرض للعميل فقط.