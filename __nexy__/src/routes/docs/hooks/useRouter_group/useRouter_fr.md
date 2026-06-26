# utiliser le routeur

Renvoie un objet avec un contexte de routage pour la requête en cours.

{% raw %}```python
from nexy import useRouter

router = useRouter()
```{% endraw %}

---

## Valeur de retour

`dict` avec les clés suivantes :

| Clé | Tapez | Descriptif |
|-----|------|-------------|
| `path` | `str` | Chemin d'URL actuel |
| `base_url` | `str` | URL de base du serveur |
| `url_for` | `callable \| None` | Fonction `url_for` de FastAPI pour la recherche inversée d'URL |

---

## Exemple

{% raw %}```nexy
---
from nexy import useRouter
router = useRouter()
---
<p>Current path: {{ router.path }}</p>
<p>Base URL: {{ router.base_url }}</p>
```{% endraw %}

---

## Recherche d'URL inversée

{% raw %}```python
router = useRouter()
if router.url_for:
    url = router.url_for("read_article", slug="hello-world")
```{% endraw %}

---

## Notes d'utilisation

- `url_for` peut être `None` en dehors du contexte de la demande
- Utilise `request.app.url_for` de FastAPI sous le capot