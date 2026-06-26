# useRouter

Gibt ein Objekt mit Routingkontext für die aktuelle Anfrage zurück.

{% raw %}```python
from nexy import useRouter

router = useRouter()
```{% endraw %}

---

## Rückgabewert

`dict` mit den folgenden Schlüsseln:

| Schlüssel | Geben Sie | ein Beschreibung |
|-----|------|-------------|
| `path` | `str` | Aktueller URL-Pfad |
| `base_url` | `str` | Basis-URL des Servers |
| `url_for` | `callable \| None` | Die `url_for`-Funktion von FastAPI für die umgekehrte URL-Suche |

---

## Beispiel

{% raw %}```nexy
---
from nexy import useRouter
router = useRouter()
---
<p>Current path: {{ router.path }}</p>
<p>Base URL: {{ router.base_url }}</p>
```{% endraw %}

---

## Umgekehrte URL-Suche

{% raw %}```python
router = useRouter()
if router.url_for:
    url = router.url_for("read_article", slug="hello-world")
```{% endraw %}

---

## Nutzungshinweise

– `url_for` kann außerhalb des Anforderungskontexts `None` sein
- Verwendet unter der Haube `request.app.url_for` von FastAPI