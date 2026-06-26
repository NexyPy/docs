# Python dans le modèle Nexy

Le frontmatter (`---`) exécute Python au moment de la compilation et à chaque requête.

---

## Ce que vous pouvez faire

### Importer des modules
{% raw %}```python
---
import json
from datetime import datetime
from nexy import usePathname
from "@components/card.nexy" import Card
---
```{% endraw %}
### Exécuter des expressions
{% raw %}```python
---
items = [1, 2, 3]
now = datetime.now()
is_admin = user.role == "admin"
---
```{% endraw %}
### Utiliser des crochets
{% raw %}```python
---
from nexy import usePathname, useSearchParams, useCookies
pathname = usePathname()
params = useSearchParams()
cookies = useCookies()
---
```{% endraw %}
### Accéder aux données de la demande
{% raw %}```python
---
from fastapi import Request
# request is injected automatically
---
```{% endraw %}
---

## Temps de compilation et temps d'exécution

| Opération | Quand | Exemple |
|---|---|---|
| `import` | Compiler | Importer des composants |
| `prop[type]` | Compiler | Étais de type vérifié |
| Crochets | Demande | `usePathname()` |
| Variables | Demande | `user = request.user` |

Les variables définies dans frontmatter sont disponibles dans le modèle :
{% raw %}```python
---
from datetime import datetime
year = datetime.now().year
---
<footer>&copy; {{ year }} Nexy</footer>
```{% endraw %}
---

## Logique partagée

Pour une logique Python réutilisable, créez un fichier `.py` standard :
{% raw %}```python
# src/utils/helpers.py
def format_date(dt):
    return dt.strftime("%B %d, %Y")
```{% endraw %}
Importer depuis n'importe quel composant :
{% raw %}```python
---
from src.utils.helpers import format_date
from datetime import datetime
---
{{ format_date(datetime.now()) }}
```{% endraw %}
{% call Link(href="/docs/components/properties") %}Next: Properties →{% endcall %}