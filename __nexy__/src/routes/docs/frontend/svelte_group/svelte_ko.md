# 호리호리한

`nexyconfig.py`에 Svelte를 추가하세요:

{% raw %}```python
from nexy.frontend import svelte

class NexyConfig(NexyConfigModel):
    useFF = [svelte()]
```{% endraw %}

---

## 컴포넌트 생성

`.svelte` 확장자를 가진 파일은 Svelte 구성 요소로 처리됩니다.

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

## .nexy 페이지에서 사용

{% raw %}```nexy
---
from "@components/Counter" import Counter
---
<Counter initial={{42}} />
```{% endraw %}

소품은 Jinja2 `{{ '{{' }} {{ '}}' }}` 구문을 통해 전달됩니다. JSON 값에는 이중 중괄호를 사용하세요.

---

## 어린이/슬롯 콘텐츠

Nexy는 하위 콘텐츠를 Svelte 슬롯으로 전달합니다.

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

Svelte 구성 요소는 서버에 미리 렌더링된 HTML이 있는 경우 `hydrate`를 사용하고 클라이언트 전용 렌더링에는 `mount`를 사용합니다.