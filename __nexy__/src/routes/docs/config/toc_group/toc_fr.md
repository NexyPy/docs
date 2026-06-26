# Table des matières

Configurez la table des matières générée automatiquement pour les pages Markdown.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTocDepth = "2-6"
    useTocTitle = "Table of Contents"
    useTocAuto = True
```{% endraw %}

---

## Champs

| Champ | Tapez | Par défaut | Descriptif |
|-------|------|---------|-------------|
| `useTocDepth` | `str` | `"2-6"` | Niveaux de titre à inclure (par exemple `"2-4"` pour h2 à h4). |
| `useTocTitle` | `str` | `"On this page"` | Titre affiché au-dessus de la table des matières. |
| `useTocAuto` | `bool` | `True` | Générer automatiquement une table des matières pour les pages `.mdx`. Réglez sur `False` pour désactiver. |

---

## Utilisation dans les modèles

{% raw %}```nexy
---
from nexy import useToc
toc_html = useToc()
---
<aside class="toc">
    {{ toc_html | safe }}
</aside>
```{% endraw %}

---

## Profondeur personnalisée

{% raw %}```nexy
---
from nexy import useToc
toc_html = useToc(depth_range="1-4")
---
```{% endraw %}

Incluez uniquement h3 à h5 :

{% raw %}```nexy
toc_html = useToc(depth_range="3-5")
```{% endraw %}