# Seiten

Eine Seite ist eine Route, die HTML zurückgibt. In Nexy sind Seiten `.nexy` oder `.mdx` Dateien unter `src/routes/`.

> Seiten unterscheiden sich von **Route Handlern** (`.py` Dateien), die JSON oder Rohdaten zurückgeben.

---

## Eine Seite erstellen

Platzieren Sie eine `.nexy`- oder `.mdx`-Datei in `src/routes/`:
{% raw %}```bash
src/
└── routes/
    └── index.nexy       →  /
```{% endraw %}
{% raw %}```html
<!-- index.nexy -->
<h1>Hello Nexy!</h1>
```{% endraw %}
Keine Routenregistrierung erforderlich – die Datei **ist** die Route.

---

## Seiten in `.nexy`

Eine `.nexy`-Datei kann Python-Frontmatter und eine HTML-Vorlage enthalten:
{% raw %}```
---
items: prop[list] = []
---
<ul>
{% for item in items %}
    {{ item }}
{% endfor %}
</ul>
```{% endraw %}
---

## Seiten in `.mdx`

`.mdx`-Dateien kombinieren Markdown mit Nexy-Komponenten:
{% raw %}```mdx
---
from "@components/link.nexy" import Link
---

# My Article

<Link href="/docs">Back to docs</Link>
```{% endraw %}
Die Seite, die Sie gerade lesen, ist selbst eine `.mdx`-Datei – das Inhaltsverzeichnis, die Seitenleiste und der Breadcrumb werden vom Layout verwaltet.

---

## Nicht weiterleitbare Spezialdateien

Einige Dateien in `routes/` erstellen keine Routen:

| Datei | Rolle |
|---|---|
| `__init__.py` | Python-Paketmarkierung |
| `layout.nexy` | Gemeinsamer Layout-Wrapper |
| `dependencies.py` | Gemeinsame Abhängigkeiten |
{% call Link(href="/docs/fbrouters/layouts") %}Next: Layouts →{% endcall %}