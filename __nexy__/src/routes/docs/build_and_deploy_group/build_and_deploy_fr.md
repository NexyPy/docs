# Construire et déployer

`nx build` compile votre projet pour la production. `nx start` exécute le serveur de production.

## Construire

{% raw %}```bash
nx build
```{% endraw %}

Compile les fichiers `.nexy`/`.mdx`, regroupe les ressources frontales et génère une arborescence de routes. La sortie va à `__nexy__/`.

Voir [CLI: build](/docs/cli/build) pour les indicateurs et les options.

## Commencer

{% raw %}```bash
nx start
```{% endraw %}

Lance le serveur de production Uvicorn.

Voir [CLI: start](/docs/cli/start) pour les indicateurs (`--port`, `--host`, `--env`).

## Déployer

Docker, VPS, Fly.io, Railway, Render — consultez le [Deploy guide](/docs/guides/deploy) pour les instructions spécifiques à la plate-forme.

## Exportation statique

Pour les sites entièrement statiques, chaque page est pré-rendue au format HTML lors de la construction. Servez `__nexy__/static/` avec n'importe quel serveur de fichiers statique.