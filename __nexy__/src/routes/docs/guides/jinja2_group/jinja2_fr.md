#Jinja2

Nexy utilise **Jinja2** comme moteur de modèles. Le bloc de modèle de chaque fichier `.nexy` est rendu en tant que modèle Jinja2.

---

## Syntaxe

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

## Contexte du modèle

Le contexte du modèle comprend :

- Tous les accessoires déclarés en première page (`item: prop[type]`)
- Aides auto-injectées : `Slot`, `trans`, `t`, `__current_locale`, `__Import`, `__Template`
- Accessoires supplémentaires : `caller`, `children`

---

## Filtres

Tous les filtres intégrés Jinja2 sont disponibles :

{% raw %}```nexy
{{ description | truncate(100) }}
{{ created_at | date(format="short") }}
{{ content | safe }}
{{ name | title }}
```{% endraw %}

---

##Macro

Les macros Jinja2 fonctionnent dans les fichiers `.nexy` :

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

## Démarquage

Les fichiers `.mdx` sont rendus au format Markdown puis enveloppés dans le modèle de mise en page. La syntaxe standard Jinja2 fonctionne également dans `.mdx`.

---

## Contrôle des espaces

Le contrôle des espaces de Jinja2 fonctionne dans les fichiers `.nexy` :

{% raw %}```nexy
{%- for item in items -%}
    {{ item }}
{%- endfor -%}
```{% endraw %}

Utilisez `{{ '{%' }}-` et `-{{ '%}' }}` pour supprimer les espaces autour des blocs de contrôle.