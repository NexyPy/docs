# Writing Markup with Nexy

Nexy templates use **HTML** + **Jinja2** for dynamic content.
If you know HTML and Jinja2, you already know Nexy templates.

---

## Text interpolation
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
Variables come from the frontmatter or from props.

---

## Filters

Jinja2 filters transform values:
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe` marks a string as safe HTML (no auto-escaping).

---

## For loops
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## If/else
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## Components in templates

Components are used like HTML elements:
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
The `Slot` component renders children (see Modules).

---

## Raw JS blocks

Use `{{ '{{' }} '' {{ '}}' }}` to protect `{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` from Jinja2 parsing (needed when embedding JS frameworks):
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}