# Cookies verwenden

Gibt die Cookies der aktuellen Anfrage als Wörterbuch zurück.

{% raw %}```python
from nexy import useCookies

cookies = useCookies()
```{% endraw %}

---

## Rückgabewert

`dict` – alle mit der Anfrage gesendeten Cookies.

---

## Beispiel

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
locale = cookies.get("nexy-locale", "en")
---
<html lang="{{ locale }}">
```{% endraw %}

---

## Nutzungshinweise

- Schreibgeschützt – verwenden Sie `useSession` zum Setzen von Cookies
- Cookie-Werte sind Zeichenfolgen
– Entspricht `request.cookies` in FastAPI