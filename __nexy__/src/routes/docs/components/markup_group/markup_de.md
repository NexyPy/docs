# Markup schreiben mit Nexy

Nexy-Vorlagen verwenden **HTML** + **Jinja2** für dynamische Inhalte.
Wenn Sie HTML und Jinja2 kennen, kennen Sie bereits Nexy-Vorlagen.

---

## Textinterpolation
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
Variablen kommen von der Frontmaterie oder von Requisiten.

---

## Filter

Jinja2-Filter transformieren Werte:
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe` markiert eine Zeichenfolge als sicheres HTML (kein automatisches Escapen).

---

## For-Schleifen
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## Wenn/sonst
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## Komponenten in Vorlagen

Komponenten werden wie HTML-Elemente verwendet:
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
Die `Slot`-Komponente rendert untergeordnete Elemente (siehe Module).

---

## Rohe JS-Blöcke

Verwenden Sie `{{ '{{' }} '' {{ '}}' }}`, um `{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` vor Jinja2-Parsing zu schützen (benötigt beim Einbetten von JS-Frameworks):
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}