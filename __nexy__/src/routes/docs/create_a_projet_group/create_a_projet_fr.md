# Démarrage rapide

Créez un projet Nexy en quelques secondes – aucune installation globale requise.

## Prérequis

- **Python 3.11+**
- **[uv](https://docs.astral.sh/uv/)** (gestionnaire de paquets)
- **Node.js 18+** (pour les composants clients et Tailwind CSS)

## Créer un projet

{% raw %}```bash
uvx nexy new
```{% endraw %}

Ou précisez directement un nom :

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

`uvx` télécharge et exécute Nexy à la volée – rien à installer globalement.

## Invites interactives

Après avoir exécuté la commande, Nexy vous guide dans la configuration du projet :

### 1. Routeur

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **Oui** — Routage basé sur des fichiers (FBR) : les pages sont des fichiers dans `routes/`
- **Non** — Routage modulaire : contrôleurs et modules avec décorateurs

### 2. Type de projet

{% raw %}```text

» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. Framework client (Web uniquement)

{% raw %}```text

» Use a client component? (Y/n)
```{% endraw %}

Si oui:

{% raw %}```text

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

Tailwind CSS est automatiquement configuré lorsqu'un framework client est sélectionné.

### 4. ORM et base de données

{% raw %}```text

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

Si un ORM est sélectionné :

{% raw %}```text

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## Démarrez le serveur de développement

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir votre application.

## Étapes suivantes

Votre projet est prêt. Rendez-vous sur [Project Structure](/docs/projet_structure) pour comprendre la disposition, ou passez directement à la construction :

- [Your First Page](/docs/fbrouters/pages) — Routage basé sur des fichiers
- [Your First Controller](/docs/modular/controllers) — Routage modulaire