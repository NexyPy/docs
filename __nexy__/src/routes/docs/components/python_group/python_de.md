# Python in der Nexy-Vorlage

Der Frontmatter (`---`) führt Python zur Kompilierungszeit und bei jeder Anfrage aus.

---

## Was Sie tun können

### Module importieren
{% raw %}```python
---
import json
from datetime import datetime
from nexy import usePathname
from "@components/card.nexy" import Card
---
```{% endraw %}
### Ausdrücke ausführen
{% raw %}```python
---
items = [1, 2, 3]
now = datetime.now()
is_admin = user.role == "admin"
---
```{% endraw %}
### Verwenden Sie Haken
{% raw %}```python
---
from nexy import usePathname, useSearchParams, useCookies
pathname = usePathname()
params = useSearchParams()
cookies = useCookies()
---
```{% endraw %}
### Zugriff auf Anforderungsdaten
{% raw %}```python
---
from fastapi import Request
# request is injected automatically
---
```{% endraw %}
---

## Kompilierungszeit vs. Laufzeit

| Betrieb | Wann | Beispiel |
|---|---|---|
| `import` | Kompilieren | Komponenten importieren |
| `prop[type]` | Kompilieren | Typgeprüfte Requisiten |
| Haken | Anfrage | `usePathname()` |
| Variablen | Anfrage | `user = request.user` |

In frontmatter definierte Variablen sind in der Vorlage verfügbar:
{% raw %}```python
---
from datetime import datetime
year = datetime.now().year
---
<footer>&copy; {{ year }} Nexy</footer>
```{% endraw %}
---

## Gemeinsame Logik

Erstellen Sie für wiederverwendbare Python-Logik eine reguläre `.py`-Datei:
{% raw %}```python
# src/utils/helpers.py
def format_date(dt):
    return dt.strftime("%B %d, %Y")
```{% endraw %}
Import aus einer beliebigen Komponente:
{% raw %}```python
---
from src.utils.helpers import format_date
from datetime import datetime
---
{{ format_date(datetime.now()) }}
```{% endraw %}
{% call Link(href="/docs/components/properties") %}Next: Properties →{% endcall %}