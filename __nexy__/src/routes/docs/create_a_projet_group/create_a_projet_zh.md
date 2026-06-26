# 快速开始

在几秒钟内创建一个 Nexy 项目 - 无需全局安装。

## 先决条件

- **Python 3.11+**
- **[uv](https://docs.astral.sh/uv/)** （包管理器）
- **Node.js 18+**（用于客户端组件和 Tailwind CSS）

## 创建一个项目

{% raw %}```bash
uvx nexy new
```{% endraw %}

或者直接指定名称：

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

`uvx` 即时下载并运行 Nexy — 无需全局安装。

## 互动提示

运行命令后，Nexy 将引导您完成项目设置：

### 1.路由器

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **是** — 基于文件的路由 (FBR)：页面是 `routes/` 中的文件
- **否** — 模块化路由：带有装饰器的控制器和模块

### 2.项目类型

{% raw %}```text

» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. 客户端框架（仅限 Web）

{% raw %}```text

» Use a client component? (Y/n)
```{% endraw %}

如果是：

{% raw %}```text

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

选择客户端框架时，Tailwind CSS 会自动配置。

### 4. ORM 和数据库

{% raw %}```text

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

如果选择 ORM：

{% raw %}```text

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## 启动开发服务器

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

打开 [http://localhost:3000](http://localhost:3000) 查看您的应用程序。

## 后续步骤

您的项目已准备就绪。前往 [Project Structure](/docs/projet_structure) 了解布局，或直接跳入构建：

- [Your First Page](/docs/fbrouters/pages) — 基于文件的路由
- [Your First Controller](/docs/modular/controllers) — 模块化路由