#Jinja2

Nexy usa **Jinja2** como mecanismo de modelo. Cada bloco de modelo do arquivo `.nexy` é renderizado como um modelo Jinja2.

---

## Sintaxe

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

## Contexto do modelo

O contexto do modelo inclui:

- Todos os adereços declarados no frontmatter (`item: prop[type]`)
- Ajudantes auto-injetados: `Slot`, `trans`, `t`, `__current_locale`, `__Import`, `__Template`
- Adereços extras: `caller`, `children`

---

## Filtros

Todos os filtros integrados do Jinja2 estão disponíveis:

{% raw %}```nexy
{{ description | truncate(100) }}
{{ created_at | date(format="short") }}
{{ content | safe }}
{{ name | title }}
```{% endraw %}

---

## Macros

As macros Jinja2 funcionam em arquivos `.nexy`:

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

## Remarcação

Os arquivos `.mdx` são renderizados como Markdown e depois agrupados no modelo de layout. A sintaxe padrão do Jinja2 também funciona dentro de `.mdx`.

---

## Controle de espaço em branco

O controle de espaço em branco do Jinja2 funciona em arquivos `.nexy`:

{% raw %}```nexy
{%- for item in items -%}
    {{ item }}
{%- endfor -%}
```{% endraw %}

Use `{{ '{%' }}-` e `-{{ '%}' }}` para remover espaços em branco ao redor dos blocos de controle.