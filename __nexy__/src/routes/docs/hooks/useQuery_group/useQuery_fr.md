# useQuery

Renvoie les paramètres d'itinéraire dynamiques (paramètres de chemin) à partir de l'URL actuelle.

{% raw %}```python
from nexy import useQuery

query = useQuery()
```{% endraw %}

---

## Valeur de retour

`dict` — paramètres de chemin extraits de l'URL (par exemple `{"slug": "hello-world"}` pour une route `[slug]`).

---

## Exemple

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<h1>Article: {{ params.slug }}</h1>
```{% endraw %}

---

## Avec plusieurs paramètres

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<article>
    {{ params.title }}
    <p>Year: {{ params.year }}, Month: {{ params.month }}</p>
</article>
```{% endraw %}

---

## Notes d'utilisation

- Les valeurs sont des chaînes par défaut — La conversion de type FastAPI s'applique dans les gestionnaires `.py`
- Équivalent à `request.path_params` dans FastAPI