# Jinja2

Nexy uses **Jinja2** as its template engine. Every `.nexy` file's template block is rendered as a Jinja2 template.

---

## Syntax

{% raw %}```nexy
---
title = "Hello"
items = [1, 2, 3]
---
{{ title }}
<ul>
{% for item in items %}
    {{ item }}
{% endfor %}
</ul>
{% if user %}
    <p>Welcome, {{ user.name }}</p>
{% endif %}
```{% endraw %}

---

## Template context

The template context includes:

- All props declared in frontmatter (`item: prop[type]`)
- Auto-injected helpers: `Slot`, `trans`, `t`, `__current_locale`, `__Import`, `__Template`
- Extra props: `caller`, `children`

---

## Filters

All Jinja2 built-in filters are available:

{% raw %}```nexy
{{ description | truncate(100) }}
{{ created_at | date(format="short") }}
{{ content | safe }}
{{ name | title }}
```{% endraw %}

---

## Macros

Jinja2 macros work in `.nexy` files:

{% raw %}```nexy
{% macro input(name, type="text", value="") %}
    <input type="{{ type }}" name="{{ name }}" value="{{ value }}" />
{% endmacro %}

<form>
    {{ input("username") }}
    {{ input("password", type="password") }}
</form>
```{% endraw %}

---

## Markdown

`.mdx` files are rendered as Markdown then wrapped in the layout template. Standard Jinja2 syntax works inside `.mdx` too.

---

## Whitespace control

Jinja2's whitespace control works in `.nexy` files:

{% raw %}```nexy
{%- for item in items -%}
    {{ item }}
{%- endfor -%}
```{% endraw %}

Use `{{ '{%' }}-` and `-{{ '%}' }}` to strip whitespace around control blocks.