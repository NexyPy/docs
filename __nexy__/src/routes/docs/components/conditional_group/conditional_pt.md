# Renderização Condicional

Controle o que é renderizado com base nas condições usando `{{ '{{' }} '' {{ '}}' }}` e `{{ '{{' }} '' {{ '}}' }}` do Jinja2.

---

## If / elif / else
{% raw %}```
---
is_logged_in: prop[bool] = False
---
{% if is_logged_in %}
    <p>Welcome back!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## Ternário
{% raw %}```html
{{ "Admin" if user.role == "admin" else "User" }}
```{% endraw %}
---

## Para loops
{% raw %}```
---
tags: prop[list] = []
---
<ul>
{% for tag in tags %}
    {{ tag }}
{% else %}
    <li>No tags</li>
{% endfor %}
</ul>
```{% endraw %}
`{{ '{{' }} '' {{ '}}' }}` é renderizado quando a lista está vazia.

---

## Atributos condicionais
{% raw %}```html
<button {{ "disabled" if not can_submit else "" }}>
    Submit
</button>
```{% endraw %}
---

## Visibilidade CSS

Para alternância do lado do cliente, combine com JavaScript:
{% raw %}```
---
---
<div id="toggle-me" class="hidden">Content</div>
<button onclick="document.getElementById('toggle-me').classList.toggle('hidden')">
    Toggle
</button>
<style>
.hidden { display: none; }
</style>
```{% endraw %}
---

## Padrão: renderização baseada em estado

Combine adereços, condições e loops para obter UIs poderosas:
{% raw %}```
---
items: prop[list] = []
empty_message: prop[str] = "No items"
---
{% if items %}
    <ul>
    {% for item in items %}
        <li class="{{ 'active' if item.active else '' }}">
            {{ item.name }}
        </li>
    {% endfor %}
    </ul>
{% else %}
    <p class="empty">{{ empty_message }}</p>
{% endif %}
```{% endraw %}
{% call Link(href="/docs/components/modules") %}Next: Module System →{% endcall %}