# Escrevendo marcação com Nexy

Os modelos Nexy usam **HTML** + **Jinja2** para conteúdo dinâmico.
Se você conhece HTML e Jinja2, já conhece os templates Nexy.

---

## Interpolação de texto
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
As variáveis ​​vêm do frontmatter ou dos adereços.

---

## Filtros

Os filtros Jinja2 transformam valores:
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe` marca uma string como HTML seguro (sem escape automático).

---

## Para loops
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## Se/outro
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## Componentes em modelos

Os componentes são usados como elementos HTML:
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
O componente `Slot` renderiza filhos (consulte Módulos).

---

## Blocos JS brutos

Use `{{ '{{' }} '' {{ '}}' }}` para proteger `{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` da análise Jinja2 (necessário ao incorporar estruturas JS):
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}