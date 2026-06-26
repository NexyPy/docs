# Layouts

Ein Layout ist eine `layout.nexy`-Datei, die alle Seiten in ihrem Verzeichnis umschließt. Es verhindert, dass auf jeder Seite dieselbe Kopfzeile, Seitenleiste oder Fußzeile wiederholt wird.

---

## Wie es funktioniert

Platzieren Sie `layout.nexy` in einem Verzeichnis `routes/`. Nexy wendet es automatisch auf alle Geschwisterseiten an (ohne selbst eine Route zu erstellen):
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

## Syntax

Das Layout erhält seinen untergeordneten Inhalt über `children:prop[str]`:
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

## Verschachtelte Layouts

Layouts sind hierarchisch verschachtelt. Eine Seite bei `blog/[slug].nexy` empfängt zuerst `blog/layout.nexy`, dann die Stammseite `layout.nexy`:
{% raw %}```bash
routes/
├── layout.nexy           ← Global layout (header, footer)
└── blog/
    ├── layout.nexy       ← Blog layout (category sidebar)
    └── [slug].nexy       ← Page → blog/layout → root/layout
```{% endraw %}
---

## Beispiel aus der Praxis

Das Layout für diese Dokumente (`src/routes/docs/layout.nexy`) verwendet `usePathname`, `Sidebar` und `Table_of_contents`:
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