# Inicio rápido

Cree un proyecto Nexy en segundos: no se requiere instalación global.

## Requisitos previos

- **Python 3.11+**
- **[uv](https://docs.astral.sh/uv/)** (administrador de paquetes)
- **Node.js 18+** (para componentes del cliente y Tailwind CSS)

## Crear un proyecto

{% raw %}```bash
uvx nexy new
```{% endraw %}

O especifique un nombre directamente:

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

`uvx` descarga y ejecuta Nexy sobre la marcha: no hay nada que instalar globalmente.

## Indicaciones interactivas

Después de ejecutar el comando, Nexy lo guiará a través de la configuración del proyecto:

### 1. Enrutador

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **Sí** — Enrutamiento basado en archivos (FBR): las páginas son archivos en `routes/`
- **No** — Enrutamiento modular: controladores y módulos con decoradores

### 2. Tipo de proyecto

{% raw %}```text

» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. Marco del cliente (solo web)

{% raw %}```text

» Use a client component? (Y/n)
```{% endraw %}

En caso afirmativo:

{% raw %}```text

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

Tailwind CSS se configura automáticamente cuando se selecciona un marco de cliente.

### 4. ORM y base de datos

{% raw %}```text

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

Si se selecciona un ORM:

{% raw %}```text

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## Inicie el servidor de desarrollo

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

Abre [http://localhost:3000](http://localhost:3000) para ver tu aplicación.

## Próximos pasos

Tu proyecto está listo. Dirígete a [Project Structure](/docs/projet_structure) para comprender el diseño o salta directamente al edificio:

- [Your First Page](/docs/fbrouters/pages) — Enrutamiento basado en archivos
- [Your First Controller](/docs/modular/controllers) — Enrutamiento modular