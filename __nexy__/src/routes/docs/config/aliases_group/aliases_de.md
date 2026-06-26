# Aliase

Konfigurieren Sie Importpfad-Aliase für sauberere Importe in Ihren `.nexy`-Dateien.

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

## Nutzung

Mit der obigen Konfiguration, statt:

{% raw %}```python
from src.components.card.nexy import Card
from src.lib.utils import format_date
```{% endraw %}

Sie können schreiben:

{% raw %}```python
from "@components/card.nexy import Card
from "@lib/utils import format_date
```{% endraw %}

---

## Wie es funktioniert

Aliase werden zur Kompilierzeit aufgelöst. Der VFS-Namespace ordnet Alias-Präfixe ihren erweiterten Pfaden zu. Sie funktionieren sowohl bei Frontmatter-Importen als auch bei Template-Aufrufen `__Import`.

Das Symbol `"@` ist eine Konvention, keine Anforderung – Sie können jedes beliebige Präfix verwenden:

{% raw %}```python
useAliases = {
    "~": "src",
    "#components": "src/components",
}
```{% endraw %}

---

## Einschränkungen

- Aliase funktionieren nur in den Dateien `.nexy` und `.mdx`
– Sie gelten **nicht** für JavaScript-/TypeScript-Importe in Client-Komponenten (verwenden Sie dazu `vite.config.ts` Pfadaliase).
- Aliase werden relativ zum Projektstamm aufgelöst, nicht zur aktuellen Datei

---

## Kombiniert mit Vite-Aliasnamen

Konfigurieren Sie für Full-Stack-Projekte sowohl Nexy-Aliase (für `.nexy`-Importe) als auch Vite-Aliase (für JS/TS-Importe):

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