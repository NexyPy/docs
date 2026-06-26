# Quick Start

Create a Nexy project in seconds — no global install required.

## Prerequisites

- **Python 3.11+**
- **[uv](https://docs.astral.sh/uv/)** (package manager)
- **Node.js 18+** (for client components and Tailwind CSS)

## Create a project

{% raw %}```bash
uvx nexy new
```{% endraw %}

Or specify a name directly:

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

`uvx` downloads and runs Nexy on the fly — nothing to install globally.

## Interactive prompts

After running the command, Nexy walks you through project setup:

### 1. Router

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **Yes** — File-Based Routing (FBR): pages are files in `routes/`
- **No** — Modular Routing: controllers and modules with decorators

### 2. Project type

{% raw %}```text

» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. Client framework (Web only)

{% raw %}```text

» Use a client component? (Y/n)
```{% endraw %}

If yes:

{% raw %}```text

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

Tailwind CSS is auto-configured when a client framework is selected.

### 4. ORM & Database

{% raw %}```text

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

If an ORM is selected:

{% raw %}```text

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## Start the dev server

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Next steps

Your project is ready. Head over to [Project Structure](/docs/projet_structure) to understand the layout, or jump straight into building:

- [Your First Page](/docs/fbrouters/pages) — File-Based Routing
- [Your First Controller](/docs/modular/controllers) — Modular Routing