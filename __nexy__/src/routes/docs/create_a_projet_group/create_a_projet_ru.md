# Быстрый старт

Создайте проект Nexy за считанные секунды — глобальная установка не требуется.

## Предварительные условия

- **Питон 3.11+**
- **[uv](https://docs.astral.sh/uv/)** (менеджер пакетов)
- **Node.js 18+** (для клиентских компонентов и CSS Tailwind)

## Создать проект

{% raw %}```bash
uvx nexy new
```{% endraw %}

Или укажите имя напрямую:

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

`uvx` загружает и запускает Nexy на лету — глобально устанавливать нечего.

## Интерактивные подсказки

После запуска команды Nexy проведет вас через настройку проекта:

### 1. Маршрутизатор

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **Да** — Маршрутизация на основе файлов (FBR): страницы представляют собой файлы в `routes/`
- **Нет** — Модульная маршрутизация: контроллеры и модули с декораторами

### 2. Тип проекта

{% raw %}```text

» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. Клиентская платформа (только в Интернете)

{% raw %}```text

» Use a client component? (Y/n)
```{% endraw %}

Если да:

{% raw %}```text

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

Tailwind CSS автоматически настраивается при выборе клиентской платформы.

### 4. ORM и база данных

{% raw %}```text

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

Если выбран ORM:

{% raw %}```text

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## Запускаем сервер разработки

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

Откройте [http://localhost:3000](http://localhost:3000), чтобы увидеть свое приложение.

## Следующие шаги

Ваш проект готов. Перейдите в [Project Structure](/docs/projet_structure), чтобы понять планировку, или сразу приступайте к строительству:

- [Your First Page](/docs/fbrouters/pages) — маршрутизация на основе файлов
- [Your First Controller](/docs/modular/controllers) — Модульная маршрутизация