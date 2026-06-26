# useSession

Gibt das Sitzungswörterbuch für die aktuelle Anfrage zurück. Sitzungen werden durch signierte Cookies gesichert – keine serverseitige Speicherung.

{% raw %}```python
from nexy import useSession

session = useSession()
```{% endraw %}

---

## Rückgabewert

`dict` – die Sitzungsdaten aus dem signierten Cookie. Gibt ein leeres Diktat zurück, wenn keine Sitzung vorhanden ist.

---

## Beispiel

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
user_id = session.get("user_id")
---
{% if user_id %}
    <p>Logged in as user {{ user_id }}</p>
{% else %}
    <p>Guest</p>
{% endif %}
```{% endraw %}

---

## Sitzungsdaten schreiben

{% raw %}```python
session = useSession()
session["user_id"] = 123
session["role"] = "admin"
del session["_flash"]
```{% endraw %}

---

## Flash-Nachrichtenmuster

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append("Item saved!")
session["_flashes"] = flashes
```{% endraw %}

---

## Nutzungshinweise

- Erfordert `useSession`-Konfiguration in `nexyconfig.py`
- Sitzungsdaten sind signiert, aber **nicht verschlüsselt**
- Keine serverseitige Speicherung – alles ist im Cookie