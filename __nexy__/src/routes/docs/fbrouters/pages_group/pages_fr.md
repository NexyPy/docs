# pages

Une page est un itinéraire qui renvoie du HTML. Dans Nexy, les pages sont des fichiers `.nexy` ou `.mdx` sous `src/routes/`.

> Les pages sont distinctes des **Route Handlers** (fichiers `.py`) qui renvoient des données JSON ou brutes.

---

## Création d'une page

Placez un fichier `.nexy` ou `.mdx` dans `src/routes/` :
{% raw %}```bash
src/
└── routes/
    └── index.nexy       →  /
```{% endraw %}
{% raw %}```html
<!-- index.nexy -->
<h1>Hello Nexy!</h1>
```{% endraw %}
Aucun enregistrement d'itinéraire n'est nécessaire : le fichier **est** l'itinéraire.

---

## Pages dans `.nexy`

Un fichier `.nexy` peut contenir un frontmatter Python et un modèle HTML :
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

## Pages dans `.mdx`

Les fichiers `.mdx` combinent Markdown avec les composants Nexy :
{% raw %}```mdx
---
from "@components/link.nexy" import Link
---

# My Article

<Link href="/docs">Back to docs</Link>
```{% endraw %}
Cette page que vous lisez est elle-même un fichier `.mdx` : la table des matières, la barre latérale et le fil d'Ariane sont gérés par la mise en page.

---

## Fichiers spéciaux non routables

Certains fichiers à l'intérieur de `routes/` ne créent pas de routes :

| Fichier | Rôle |
|---|---|
| `__init__.py` | Marqueur de package Python |
| `layout.nexy` | Wrapper de mise en page partagé |
| `dependencies.py` | Dépendances partagées |
{% call Link(href="/docs/fbrouters/layouts") %}Next: Layouts →{% endcall %}