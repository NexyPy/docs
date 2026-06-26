# Layouts

A layout is a `layout.nexy` file that wraps all pages in its directory. It prevents repeating the same header, sidebar, or footer on every page.

---

## How it works

Place `layout.nexy` inside a `routes/` directory. Nexy applies it automatically to all sibling pages (without creating a route itself):
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

The layout receives its child content via `children:prop[str]`:
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

## Nested layouts

Layouts nest hierarchically. A page at `blog/[slug].nexy` receives `blog/layout.nexy` first, then the root `layout.nexy`:
{% raw %}```bash
routes/
├── layout.nexy           ← Global layout (header, footer)
└── blog/
    ├── layout.nexy       ← Blog layout (category sidebar)
    └── [slug].nexy       ← Page → blog/layout → root/layout
```{% endraw %}
---

## Real-world example

The layout for these docs (`src/routes/docs/layout.nexy`) uses `usePathname`, `Sidebar`, and `Table_of_contents`:
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