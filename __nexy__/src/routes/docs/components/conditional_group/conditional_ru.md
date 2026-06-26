# Условный рендеринг

Управляйте тем, что отображается в зависимости от условий, используя `{{ '{{' }} '' {{ '}}' }}` и `{{ '{{' }} '' {{ '}}' }}` Jinja2.

---

## Если /elif/else
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

## Тройная система
{% raw %}```html
{{ "Admin" if user.role == "admin" else "User" }}
```{% endraw %}
---

## Для циклов
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
`{{ '{{' }} '' {{ '}}' }}` отображается, когда список пуст.

---

## Условные атрибуты
{% raw %}```html
<button {{ "disabled" if not can_submit else "" }}>
    Submit
</button>
```{% endraw %}
---

## Видимость CSS

Для переключения на стороне клиента объедините его с JavaScript:
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

## Шаблон: рендеринг на основе состояния

Комбинируйте реквизиты, условия и циклы для создания мощных пользовательских интерфейсов:
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