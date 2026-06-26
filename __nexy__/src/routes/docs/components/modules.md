# Module System

Nexy's module system lets you import and export components across your project.

---

## Importing a component

Use the `import` syntax in the frontmatter:

{% raw %}```python
---
from "@components/card.nexy" import Card
from "@components/button.nexy" import Button
---
```{% endraw %}

The `"@` alias resolves to `src/` (configurable in `nexyconfig.py`).

---

## Named exports

By default, a `.nexy` file exports its template as a component named after the file:

| File | Export name |
|---|---|
| `card.nexy` | `Card` |
| `button.nexy` | `Button` |
| `table_of_contents.nexy` | `Table_of_contents` |

---

## Slot (children)

The `Slot` component renders child content passed between opening/closing tags:

{% raw %}```nexy
<div class="card">
    {{ title }}
    <Slot />
</div>
```{% endraw %}

Usage:

{% raw %}```html
<Card title="Hello">
    <p>This goes into the Slot.</p>
</Card>
```{% endraw %}

---

## Import aliases

Use `as` to avoid naming conflicts:

{% raw %}```python
---
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
---
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

---

## Re-exporting

Create an index file that aggregates components:

{% raw %}```python
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

Other files import from this barrel:

{% raw %}```python
---
from "@components/index.nexy" import Card, Button
---
```{% endraw %}

-----

## Dynamic imports

For client-side frameworks (React, Solid), Nexy generates the import tree automatically during build. You don't need to manage entry points manually — the compiler detects `.tsx`/`.jsx` usage and wires up Vite or esbuild accordingly.