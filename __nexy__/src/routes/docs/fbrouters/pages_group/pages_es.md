# páginas

Una página es una ruta que devuelve HTML. En Nexy, las páginas son archivos `.nexy` o `.mdx` bajo `src/routes/`.

> Las páginas son distintas de los **Manejadores de rutas** (archivos `.py`) que devuelven JSON o datos sin procesar.

---

## Creando una página

Coloque un archivo `.nexy` o `.mdx` en `src/routes/`:
{% raw %}```bash
src/
└── routes/
    └── index.nexy       →  /
```{% endraw %}
{% raw %}```html
<!-- index.nexy -->
<h1>Hello Nexy!</h1>
```{% endraw %}
No es necesario registrar la ruta: el archivo **es** la ruta.

---

## Páginas en `.nexy`

Un archivo `.nexy` puede contener contenido de Python y una plantilla HTML:
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

## Páginas en `.mdx`

Los archivos `.mdx` combinan Markdown con componentes Nexy:
{% raw %}```mdx
---
from "@components/link.nexy" import Link
---

# My Article

<Link href="/docs">Back to docs</Link>
```{% endraw %}
Esta página que estás leyendo es en sí misma un archivo `.mdx`: el TOC, la barra lateral y la ruta de navegación son manejados por el diseño.

---

## Archivos especiales no enrutables

Algunos archivos dentro de `routes/` no crean rutas:

| Archivo | Rol |
|---|---|
| `__init__.py` | Marcador de paquete Python |
| `layout.nexy` | Envoltorio de diseño compartido |
| `dependencies.py` | Dependencias compartidas |
{% call Link(href="/docs/fbrouters/layouts") %}Next: Layouts →{% endcall %}