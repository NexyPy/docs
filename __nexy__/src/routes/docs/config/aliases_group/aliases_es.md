# Alias

Configure alias de ruta de importación para importaciones más limpias en sus archivos `.nexy`.

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

## Uso

Con la configuración anterior, en lugar de:

{% raw %}```python
from src.components.card.nexy import Card
from src.lib.utils import format_date
```{% endraw %}

Puedes escribir:

{% raw %}```python
from "@components/card.nexy import Card
from "@lib/utils import format_date
```{% endraw %}

---

## Cómo funciona

Los alias se resuelven en tiempo de compilación. El espacio de nombres VFS asigna prefijos de alias a sus rutas expandidas. Funcionan tanto en importaciones de front-matter como en llamadas de plantilla `__Import`.

El símbolo `"@` es una convención, no un requisito; puede utilizar cualquier prefijo:

{% raw %}```python
useAliases = {
    "~": "src",
    "#components": "src/components",
}
```{% endraw %}

---

## Limitaciones

- Los alias funcionan solo en archivos `.nexy` y `.mdx`
- **No** se aplican a las importaciones de JavaScript/TypeScript en componentes del cliente (use `vite.config.ts` alias de ruta para eso)
- Los alias se resuelven en relación con la raíz del proyecto, no con el archivo actual.

---

## Combinado con alias de Vite

Para proyectos de pila completa, configure los alias Nexy (para importaciones `.nexy`) y alias Vite (para importaciones JS/TS):

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