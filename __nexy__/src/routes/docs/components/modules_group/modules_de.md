# Modulsystem

Mit dem Modulsystem von Nexy können Sie Komponenten in Ihrem Projekt importieren und exportieren.

---

## Importieren einer Komponente

Verwenden Sie im Frontmatter die `import`-Syntax:

{% raw %}```python
---
from "@components/card.nexy" import Card
from "@components/button.nexy" import Button
---
```{% endraw %}

Der Alias ​​`"@` wird in `src/` aufgelöst (konfigurierbar in `nexyconfig.py`).

---

## Benannte Exporte

Standardmäßig exportiert eine `.nexy`-Datei ihre Vorlage als Komponente, die nach der Datei benannt ist:

| Datei | Exportname |
|---|---|
| `card.nexy` | `Card` |
| `button.nexy` | `Button` |
| `table_of_contents.nexy` | `Table_of_contents` |

---

## Slot (Kinder)

Die `Slot`-Komponente rendert untergeordnete Inhalte, die zwischen öffnenden/schließenden Tags übergeben werden:

{% raw %}```nexy
<div class="card">
    {{ title }}
    <Slot />
</div>
```{% endraw %}

Verwendung:

{% raw %}```html
<Card title="Hello">
    <p>This goes into the Slot.</p>
</Card>
```{% endraw %}

---

## Aliase importieren

Verwenden Sie `as`, um Namenskonflikte zu vermeiden:

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

## Wiederexportieren

Erstellen Sie eine Indexdatei, die Komponenten aggregiert:

{% raw %}```python
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

Andere Dateien werden aus diesem Fass importiert:

{% raw %}```python
---
from "@components/index.nexy" import Card, Button
---
```{% endraw %}

-----

## Dynamische Importe

Für clientseitige Frameworks (React, Solid) generiert Nexy den Importbaum automatisch während des Builds. Sie müssen Einstiegspunkte nicht manuell verwalten – der Compiler erkennt die Nutzung von `.tsx`/`.jsx` und verbindet Vite oder esbuild entsprechend.