# Escribir marcado con Nexy

Las plantillas Nexy usan **HTML** + **Jinja2** para contenido dinámico.
Si conoce HTML y Jinja2, ya conoce las plantillas de Nexy.

---

## Interpolación de texto
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
Las variables provienen del frontmatter o de los accesorios.

---

## Filtros

Los filtros Jinja2 transforman valores:
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe` marca una cadena como HTML seguro (sin escape automático).

---

## Para bucles
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## Si/si no
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## Componentes en plantillas

Los componentes se utilizan como elementos HTML:
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
El componente `Slot` representa niños (ver Módulos).

---

## Bloques JS sin procesar

Utilice `{{ '{{' }} '' {{ '}}' }}` para proteger `{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` del análisis de Jinja2 (necesario al incorporar marcos JS):
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}