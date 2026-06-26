# Rendu conditionnel

Contrôlez le rendu en fonction des conditions à l'aide des `{{ '{{' }} '' {{ '}}' }}` et `{{ '{{' }} '' {{ '}}' }}` de Jinja2.

---

## Si / elif / sinon
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

## Ternaire
{% raw %}```html
{{ "Admin" if user.role == "admin" else "User" }}
```{% endraw %}
---

## Pour les boucles
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
`{{ '{{' }} '' {{ '}}' }}` s'affiche lorsque la liste est vide.

---

## Attributs conditionnels
{% raw %}```html
<button {{ "disabled" if not can_submit else "" }}>
    Submit
</button>
```{% endraw %}
---

## Visibilité CSS

Pour le basculement côté client, combinez-le avec JavaScript :
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

## Modèle : rendu basé sur l'état

Combinez des accessoires, des conditions et des boucles pour créer des interfaces utilisateur puissantes :
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