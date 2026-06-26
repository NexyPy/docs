# Diseños

Un diseño es un archivo `layout.nexy` que envuelve todas las páginas en su directorio. Evita repetir el mismo encabezado, barra lateral o pie de página en cada página.

---

## Cómo funciona

Coloque `layout.nexy` dentro de un directorio `routes/`. Nexy lo aplica automáticamente a todas las páginas hermanas (sin crear una ruta):
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

## Sintaxis

El diseño recibe su contenido secundario a través de `children:prop[str]`:
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

## Diseños anidados

Los diseños se anidan jerárquicamente. Una página en `blog/[slug].nexy` recibe `blog/layout.nexy` primero, luego la raíz `layout.nexy`:
{% raw %}```bash
routes/
├── layout.nexy           ← Global layout (header, footer)
└── blog/
    ├── layout.nexy       ← Blog layout (category sidebar)
    └── [slug].nexy       ← Page → blog/layout → root/layout
```{% endraw %}
---

## Ejemplo del mundo real

El diseño de estos documentos (`src/routes/docs/layout.nexy`) utiliza `usePathname`, `Sidebar` y `Table_of_contents`:
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