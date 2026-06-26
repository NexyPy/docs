# utiliser des cookies

Renvoie les cookies de la requête en cours sous forme de dictionnaire.

{% raw %}```python
from nexy import useCookies

cookies = useCookies()
```{% endraw %}

---

## Valeur de retour

`dict` — tous les cookies envoyés avec la demande.

---

## Exemple

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
locale = cookies.get("nexy-locale", "en")
---
<html lang="{{ locale }}">
```{% endraw %}

---

## Notes d'utilisation

- Lecture seule : utilisez `useSession` pour définir les cookies
- Les valeurs des cookies sont des chaînes
- Équivalent à `request.cookies` dans FastAPI