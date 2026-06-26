# "@Action

Transformez une fonction Python en un point de terminaison de serveur appelable depuis le navigateur – pas d'enregistrement de routeur, pas d'analyse de requête.

{% raw %}```python
from nexy.decorators import Action

"@Action
def submit_comment(post_id: int, body: str) -> dict:
    return {"status": "ok"}
```{% endraw %}

---

## Signature

{% raw %}```python
Action(func: Callable | None = None) -> Callable
```{% endraw %}

Utilisé avec ou sans parenthèses :

{% raw %}```python
"@Action
def fn(): ...

"@Action()
def fn(): ...
```{% endraw %}

---

## Comment ça marche

1. Enregistre la fonction dans `ActionsStore`
2. Au démarrage, `ActionEngine` découvre toutes les actions et les monte en tant que `POST /_nx_{hash}`
3. Hachage d'URL = `sha256(func_name + "salt2026")[:12]` — déterministe par déploiement
4. Arguments analysés à partir du corps JSON, injectés par nom
5. Valeur de retour sérialisée au format JSON

---

## Types de paramètres

| Tapez | Source | Exemple |
|------|--------|---------|
| `str`, `int`, `float`, `bool` | Corps JSON | `post_id: int` |
| `list`, `dict` | Corps JSON | `tags: list[str]` |
| Modèles pydantiques | Corps JSON (validé) | `data: CreateComment` |
| `Request` | Injection FastAPI | `request: Request` |

---

## Types de retour

| Retour | Réponse |
|--------|----------|
| `dict` | `JSONResponse` |
| `list` | `JSONResponse` |
| `str` | `PlainTextResponse` |
| `int`, `float`, `bool` | `JSONResponse` |
| `BaseModel` | `JSONResponse` |
| `None` | `JSONResponse({"ok": True})` |

---

## Limites

- POST uniquement
- Corps JSON uniquement (pas de données de formulaire, multipart)
- Le sel de hachage est codé en dur — URL stable au sein d'un déploiement

---

Voir [Server Actions guide](/docs/guides/actions) pour des exemples d'utilisation et l'intégration client.