# Écrire du balisage avec Nexy

Les modèles Nexy utilisent **HTML** + **Jinja2** pour le contenu dynamique.
Si vous connaissez HTML et Jinja2, vous connaissez déjà les modèles Nexy.

---

## Interpolation de texte
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
Les variables proviennent du frontmatter ou des accessoires.

---

## Filtres

Les filtres Jinja2 transforment les valeurs :
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe` marque une chaîne comme HTML sécurisé (pas d'échappement automatique).

---

## Pour les boucles
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## Si/sinon
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## Composants dans les modèles

Les composants sont utilisés comme des éléments HTML :
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
Le composant `Slot` restitue les enfants (voir Modules).

---

## Blocs JS bruts

Utilisez `{{ '{{' }} '' {{ '}}' }}` pour protéger `{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` de l'analyse Jinja2 (nécessaire lors de l'intégration de frameworks JS) :
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}