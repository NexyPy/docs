# クイックスタート

Nexy プロジェクトを数秒で作成できます。グローバル インストールは必要ありません。

## 前提条件

- **Python 3.11+**
- **[uv](https://docs.astral.sh/uv/)** (パッケージマネージャー)
- **Node.js 18+** (クライアント コンポーネントおよび Tailwind CSS 用)

## プロジェクトを作成する

{% raw %}```bash
uvx nexy new
```{% endraw %}

または、名前を直接指定します。

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

`uvx` は Nexy をその場でダウンロードして実行します。グローバルにインストールするものはありません。

## 対話型プロンプト

コマンドを実行すると、Nexy がプロジェクトのセットアップを案内します。

### 1.ルーター

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **はい** — ファイルベース ルーティング (FBR): ページは `routes/` のファイルです
- **いいえ** — モジュラー ルーティング: デコレーターを備えたコントローラーとモジュール

### 2. プロジェクトの種類

{% raw %}```text

» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. クライアント フレームワーク (Web のみ)

{% raw %}```text

» Use a client component? (Y/n)
```{% endraw %}

「はい」の場合:

{% raw %}```text

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

Tailwind CSS は、クライアント フレームワークが選択されると自動的に構成されます。

### 4. ORM とデータベース

{% raw %}```text

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

ORM が選択されている場合:

{% raw %}```text

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## 開発サーバーを起動します

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

[http://localhost:3000](http://localhost:3000) を開いてアプリを確認します。

## 次のステップ

プロジェクトの準備が完了しました。 [Project Structure](/docs/projet_structure) に移動してレイアウトを理解するか、直接構築に進んでください。

- [Your First Page](/docs/fbrouters/pages) — ファイルベースのルーティング
- [Your First Controller](/docs/modular/controllers) — モジュラールーティング