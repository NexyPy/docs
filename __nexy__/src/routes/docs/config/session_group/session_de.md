# Sitzung

Konfigurieren Sie Sitzungs-Middleware für Sitzungen mit signierten Cookies – kein serverseitiger Speicher erforderlich.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useSession = {
        "secret_key": "your-secret-key",
        "max_age": 3600,
        "same_site": "lax",
        "https_only": False,
    }
```{% endraw %}

Verwendet Starlettes `SessionMiddleware` unter der Haube.

---

## Felder

| Feld | Geben Sie | ein Standard | Beschreibung |
|-------|------|---------|-------------|
| `secret_key` | `str` | erforderlich | Geheimer Schlüssel zum Signieren von Sitzungscookies |
| `max_age` | `int` | `1209600` (14 Tage) | Maximales Alter des Sitzungscookies in Sekunden |
| `same_site` | `str` | `"lax"` | SameSite-Richtlinie (`"lax"`, `"strict"`, `"none"`) |
| `https_only` | `bool` | `False` | Senden Sie Cookies nur über HTTPS |

---

## Nutzung

{% raw %}```python
from nexy import useSession

session = useSession()
session["user_id"] = 123
session["role"] = "admin"
```{% endraw %}

Die Sitzung verhält sich wie ein Wörterbuch – zuweisen, lesen, löschen:

{% raw %}```python
session = useSession()
user_id = session.get("user_id")
del session["user_id"]
```{% endraw %}

---

## Flash-Nachrichtenmuster

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append({"type": "success", "text": "Saved!"})
session["_flashes"] = flashes
```{% endraw %}

Dann lesen und löschen Sie in Ihrer Vorlage:

{% raw %}```python
session = useSession()
flashes = session.pop("_flashes", [])
```{% endraw %}

---

## Sicherheitshinweise

- Sitzungsdaten sind signiert, aber **nicht verschlüsselt** – es werden keine sensiblen Daten gespeichert
- `secret_key` regelmäßig in der Produktion rotieren
- Verwenden Sie `https_only=True` in der Produktion