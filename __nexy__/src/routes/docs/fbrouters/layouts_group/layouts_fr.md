# Mises en page

Une mise en page est un fichier `layout.nexy` qui enveloppe toutes les pages de son répertoire. Cela évite de répéter le même en-tête, barre latérale ou pied de page sur chaque page.

---

## Comment ça marche

Placez `layout.nexy` dans un répertoire `routes/`. Nexy l'applique automatiquement à toutes les pages sœurs (sans créer lui-même de parcours) :
{% raw %}```bash
routes/
├── layout.nexy           ← Applied to / and /about
├── index.nexy
├── about.nexy
└── blog/
    ├── layout.nexy       ← Applied to /blog/...
    ├── index.nexy
    └── [slug].nexy
```{% endraw %}
---

## Syntaxe

La mise en page reçoit son contenu enfant via `children:prop[str]` :
{% raw %}```
---
children: prop[str]
---
<header class="site-header">
    <nav>...</nav>
</header>
{{ children | safe }}
<footer>...</footer>
```{% endraw %}
---

## Mises en page imbriquées

Les mises en page s'imbriquent hiérarchiquement. Une page à `blog/[slug].nexy` reçoit `blog/layout.nexy` en premier, puis la racine `layout.nexy` :
{% raw %}```bash
routes/
├── layout.nexy           ← Global layout (header, footer)
└── blog/
    ├── layout.nexy       ← Blog layout (category sidebar)
    └── [slug].nexy       ← Page → blog/layout → root/layout
```{% endraw %}
---

## Exemple concret

La mise en page de ces documents (`src/routes/docs/layout.nexy`) utilise `usePathname`, `Sidebar` et `Table_of_contents` :
{% raw %}```python
from nexy import usePathname
from "@components/docs/sidebar.nexy" import Sidebar
from "@components/docs/table_of_contents.nexy" import Table_of_contents
```{% endraw %}
{% raw %}```html
<main>
    <Sidebar />
    {{ children | safe }}
    <Table_of_contents />
</main>
```{% endraw %}
{% call Link(href="/docs/fbrouters/dependencies") %}Next: Dependencies →{% endcall %}