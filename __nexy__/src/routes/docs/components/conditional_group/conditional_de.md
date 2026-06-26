# Bedingtes Rendering

Steuern Sie, was basierend auf den Bedingungen gerendert wird, indem Sie Jinja2s `{{ '{{' }} '' {{ '}}' }}` und `{{ '{{' }} '' {{ '}}' }}` verwenden.

---

## Wenn / elif / sonst
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

## Ternär
{% raw %}```html
{{ "Admin" if user.role == "admin" else "User" }}
```{% endraw %}
---

## For-Schleifen
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
`{{ '{{' }} '' {{ '}}' }}` wird gerendert, wenn die Liste leer ist.

---

## Bedingte Attribute
{% raw %}```html
<button {{ "disabled" if not can_submit else "" }}>
    Submit
</button>
```{% endraw %}
---

## CSS-Sichtbarkeit

Für clientseitiges Umschalten kombinieren Sie es mit JavaScript:
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

## Muster: Zustandsbasiertes Rendering

Kombinieren Sie Requisiten, Bedingungen und Schleifen für leistungsstarke Benutzeroberflächen:
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