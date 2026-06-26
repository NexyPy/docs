# FBR ou routeur modulaire

Nexy propose **deux stratégies de routage**. Vous choisissez lors de la création du projet – et la bascule en haut de cette barre latérale change la documentation en conséquence.

## Routage basé sur des fichiers (FBR)

Les itinéraires sont définis par votre arborescence de fichiers sous `src/routes/`.

{% raw %}```text
src/routes/

├── index.nexy        →  /

├── about.nexy        →  /about

├── blog/

│   ├── index.nexy    →  /blog

│   └── [slug].nexy   →  /blog/{slug}

└── layout.nexy       →  shared layout
```{% endraw %}

**Choisissez FBR quand** :

- Vous voulez une convention sur la configuration
- Vous créez un site simple, des documents ou un MVP
- Votre application correspond à une hiérarchie de pages claire
- Vous préférez moins de passe-partout

## Routeur modulaire

Les routes sont définies via les décorateurs Python dans `src/apps/`.

{% raw %}```text
src/apps/

├── app_module.py     →  "@Module(root module)

├── app_controller.py →  "@Controller("/")

├── app_view.nexy     →  template

├── users/

│   ├── user_module.py

│   ├── user_controller.py

│   └── user_service.py

└── layout.nexy       →  shared layout
```{% endraw %}

**Choisissez Modulaire lorsque** :

- Votre application est volumineuse avec des limites de domaine claires
- Vous souhaitez une injection de dépendances et des services testables
- Vous venez de NestJS/Angular et préférez les décorateurs
- Plusieurs équipes possèdent différents modules de fonctionnalités

## Les deux dans un seul projet

Votre `nexyconfig.py` contrôle quel routeur utiliser :

{% raw %}```python
# FBR — no explicit router config needed

class NexyConfig(NexyConfigModel):

    pass
```{% endraw %}

{% raw %}```python
# Modular — import the APIRouter from your root "@Module

from src.apps.app_module import AppModule  # "@Module() returns an APIRouter

class NexyConfig(NexyConfigModel):

    useRouter = AppModule
```{% endraw %}

Vous ne pouvez pas mélanger les deux dans un seul projet : choisissez celui qui convient à votre équipe et à son échelle.