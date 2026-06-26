# Système de modules

Le système de modules de Nexy vous permet d'importer et d'exporter des composants dans tout votre projet.

---

## Importer un composant

Utilisez la syntaxe `import` dans le texte :

{% raw %}```python
---
from "@components/card.nexy" import Card
from "@components/button.nexy" import Button
---
```{% endraw %}

L'alias `"@` est résolu en `src/` (configurable dans `nexyconfig.py`).

---

## Exportations nommées

Par défaut, un fichier `.nexy` exporte son modèle en tant que composant nommé d'après le fichier :

| Fichier | Nom de l'exportation |
|---|---|
| `card.nexy` | `Card` |
| `button.nexy` | `Button` |
| `table_of_contents.nexy` | `Table_of_contents` |

---

## Emplacement (enfants)

Le composant `Slot` restitue le contenu enfant transmis entre les balises d'ouverture/fermeture :

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

## Importer des alias

Utilisez `as` pour éviter les conflits de noms :

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

## Réexportation

Créez un fichier d'index qui regroupe les composants :

{% raw %}```python
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

D'autres fichiers sont importés depuis ce baril :

{% raw %}```python
---
from "@components/index.nexy" import Card, Button
---
```{% endraw %}

-----

## Importations dynamiques

Pour les frameworks côté client (React, Solid), Nexy génère automatiquement l'arborescence d'importation lors de la construction. Vous n'avez pas besoin de gérer les points d'entrée manuellement - le compilateur détecte l'utilisation de `.tsx`/`.jsx` et connecte Vite ou esbuild en conséquence.