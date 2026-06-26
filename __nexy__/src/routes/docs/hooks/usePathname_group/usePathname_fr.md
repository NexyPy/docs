# usePathname

Renvoie le chemin de l'URL actuel sous forme de chaîne.

{% raw %}```python
from nexy import usePathname

pathname = usePathname()
```{% endraw %}

---

## Valeur de retour

`str` — le composant de chemin de l'URL de la requête actuelle (par exemple `/docs/hooks/usePathname`).

---

## Exemple

{% raw %}```nexy
---
from nexy import usePathname
path = usePathname()
---
<nav class="breadcrumb">
    {% set segments = path.strip('/').split('/') %}
    {% for seg in segments %}
        <span>/ {{ seg }}</span>
    {% endfor %}
</nav>
```{% endraw %}

---

## Notes d'utilisation

- Disponible en frontmatter `.nexy` et `.mdx`
- Également disponible dans les gestionnaires de route `.py` via `request.url.path`
- Renvoie uniquement le chemin — pas de chaîne de requête, pas de fragment