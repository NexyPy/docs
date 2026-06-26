# useViews

Rend un modèle de vue (`.nexy`, `.mdx` ou composant frontend) avec un contexte donné, renvoyant un `HTMLResponse`.

{% raw %}```python
from nexy import useViews

html = useViews(path, context=None)
```{% endraw %}

---

## Paramètres

| Paramètre | Tapez | Par défaut | Descriptif |
|---------------|------|---------|-------------|
| `path` | `str` | requis | Chemin d'accès au fichier de vue (par rapport au projet) |
| `context` | `dict \| None` | `None` | Variables à transmettre au modèle |

---

## Valeur de retour

`HTMLResponse` — le HTML rendu avec les actifs Vite injectés.

---

## Exemple

{% raw %}```nexy
---
from nexy import useViews
html = useViews("src/routes/components/card.nexy", {"title": "Hello", "body": "World"})
---
{{ html | safe }}
```{% endraw %}

---

## Composants frontaux

Pour les vues `.tsx`, `.vue`, `.svelte` et `.jsx`, `useViews` renvoie un conteneur hydratable :

{% raw %}```nexy
---
from nexy import useViews
container = useViews("src/components/Counter.tsx", {"initial": 0})
---
{{ container | safe }}
```{% endraw %}

Le conteneur comprend les attributs `data-nexy-fw`, `data-nexy-path` et `data-nexy-props` pour l'hydratation côté client.

---

## Extensions prises en charge

| Rallonge | Comportement |
|-----------|----------|
| `.nexy` | Modèle compilé → rendu HTML |
| `.mdx` | Markdown + composants → HTML rendu |
| `.tsx` | Conteneur hydratable (React/Solid/Preact) |
| `.vue` | Conteneur hydratable |
| `.svelte` | Conteneur hydratable |
| `.jsx` | Conteneur hydratable |