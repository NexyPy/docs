# Jinja2

Nexy verwendet **Jinja2** als Template-Engine. Der Vorlagenblock jeder `.nexy`-Datei wird als Jinja2-Vorlage gerendert.

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

## Vorlagenkontext

Der Vorlagenkontext umfasst:

- Alle in frontmatter deklarierten Requisiten (`item: prop[type]`)
- Automatisch injizierte Helfer: `Slot`, `trans`, `t`, `__current_locale`, `__Import`, `__Template`
- Zusätzliche Requisiten: `caller`, `children`

---

## Filter

Alle in Jinja2 integrierten Filter sind verfügbar:

{% raw %}```nexy
{{ description | truncate(100) }}
{{ created_at | date(format="short") }}
{{ content | safe }}
{{ name | title }}
```{% endraw %}

---

## Makros

Jinja2-Makros funktionieren in `.nexy`-Dateien:

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

## Abschlag

`.mdx`-Dateien werden als Markdown gerendert und dann in die Layoutvorlage eingeschlossen. Die Standard-Jinja2-Syntax funktioniert auch in `.mdx`.

---

## Leerzeichenkontrolle

Die Leerzeichensteuerung von Jinja2 funktioniert in `.nexy`-Dateien:

{% raw %}```nexy
{%- for item in items -%}
    {{ item }}
{%- endfor -%}
```{% endraw %}

Verwenden Sie `{{ '{%' }}-` und `-{{ '%}' }}`, um Leerzeichen um Kontrollblöcke herum zu entfernen.