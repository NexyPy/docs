# Aliases

Configure import path aliases for cleaner imports in your `.nexy` files.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useAliases = {
        ""@": "src",
        ""@components": "src/components",
        ""@lib": "src/lib",
    }
```{% endraw %}

---

## Usage

With the config above, instead of:

{% raw %}```python
from src.components.card.nexy import Card
from src.lib.utils import format_date
```{% endraw %}

You can write:

{% raw %}```python
from "@components/card.nexy import Card
from "@lib/utils import format_date
```{% endraw %}

---

## How it works

Aliases are resolved at compile time. The VFS namespace maps alias prefixes to their expanded paths. They work in both frontmatter imports and template `__Import` calls.

The `"@` symbol is a convention, not a requirement — you can use any prefix:

{% raw %}```python
useAliases = {
    "~": "src",
    "#components": "src/components",
}
```{% endraw %}

---

## Limitations

- Aliases work in `.nexy` and `.mdx` files only
- They do **not** apply to JavaScript/TypeScript imports in client components (use `vite.config.ts` path aliases for that)
- Aliases are resolved relative to the project root, not the current file

---

## Combined with Vite aliases

For full-stack projects, configure both Nexy aliases (for `.nexy` imports) and Vite aliases (for JS/TS imports):

{% raw %}```python
# nexyconfig.py
useAliases = {""@": "src"}
```{% endraw %}

{% raw %}```ts
// vite.config.ts
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    resolve: {
        alias: { ""@": resolve(__dirname, "src") },
    },
});
```{% endraw %}