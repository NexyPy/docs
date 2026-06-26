# Início rápido

Crie um projeto Nexy em segundos – não é necessária instalação global.

## Pré-requisitos

- **Python 3.11+**
- **[uv](https://docs.astral.sh/uv/)** (gerenciador de pacotes)
- **Node.js 18+** (para componentes do cliente e Tailwind CSS)

## Crie um projeto

{% raw %}```bash
uvx nexy new
```{% endraw %}

Ou especifique um nome diretamente:

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

`uvx` baixa e executa o Nexy instantaneamente – nada para instalar globalmente.

## Prompts interativos

Depois de executar o comando, Nexy orienta você na configuração do projeto:

### 1. Roteador

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **Sim** — Roteamento baseado em arquivo (FBR): as páginas são arquivos em `routes/`
- **Não** — Roteamento Modular: controladores e módulos com decoradores

### 2. Tipo de projeto

{% raw %}```text

» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. Estrutura do cliente (somente Web)

{% raw %}```text

» Use a client component? (Y/n)
```{% endraw %}

Se sim:

{% raw %}```text

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

Tailwind CSS é configurado automaticamente quando uma estrutura de cliente é selecionada.

### 4. ORM e banco de dados

{% raw %}```text

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

Se um ORM for selecionado:

{% raw %}```text

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## Inicie o servidor de desenvolvimento

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

Abra [http://localhost:3000](http://localhost:3000) para ver seu aplicativo.

##Próximas etapas

Seu projeto está pronto. Vá para [Project Structure](/docs/projet_structure) para entender o layout ou vá direto para a construção:

- [Your First Page](/docs/fbrouters/pages) — Roteamento baseado em arquivo
- [Your First Controller](/docs/modular/controllers) — Roteamento Modular