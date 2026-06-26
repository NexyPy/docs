# Schnellstart

Erstellen Sie in Sekundenschnelle ein Nexy-Projekt – keine globale Installation erforderlich.

## Voraussetzungen

- **Python 3.11+**
- **[uv](https://docs.astral.sh/uv/)** (Paketmanager)
- **Node.js 18+** (für Client-Komponenten und Tailwind CSS)

## Erstellen Sie ein Projekt

{% raw %}```bash
uvx nexy new
```{% endraw %}

Oder geben Sie direkt einen Namen an:

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

`uvx` lädt Nexy im Handumdrehen herunter und führt es aus – es muss nichts global installiert werden.

## Interaktive Eingabeaufforderungen

Nachdem Sie den Befehl ausgeführt haben, führt Sie Nexy durch die Projekteinrichtung:

### 1. Router

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **Ja** – File-Based Routing (FBR): Seiten sind Dateien in `routes/`
- **Nein** – Modulares Routing: Controller und Module mit Dekoratoren

### 2. Projekttyp

{% raw %}```text

» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. Client-Framework (nur Web)

{% raw %}```text

» Use a client component? (Y/n)
```{% endraw %}

Wenn ja:

{% raw %}```text

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

Tailwind CSS wird automatisch konfiguriert, wenn ein Client-Framework ausgewählt wird.

### 4. ORM & Datenbank

{% raw %}```text

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

Wenn ein ORM ausgewählt ist:

{% raw %}```text

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## Starten Sie den Entwicklungsserver

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

Öffnen Sie [http://localhost:3000](http://localhost:3000), um Ihre App anzuzeigen.

## Nächste Schritte

Ihr Projekt ist fertig. Gehen Sie zu [Project Structure](/docs/projet_structure), um das Layout zu verstehen, oder beginnen Sie direkt mit dem Aufbau:

- [Your First Page](/docs/fbrouters/pages) – Dateibasiertes Routing
- [Your First Controller](/docs/modular/controllers) – Modulares Routing