#nxビルド

実稼働用にプロジェクトをコンパイルします (`.nexy`/`.mdx` コンパイル、SSG、およびクライアント バンドル)。

{% raw %}```bash
nx build
```{% endraw %}

---

## 何をするのか

1. すべての `.nexy`/`.mdx` ファイルを `__nexy__/` にコンパイルします (並列、マルチスレッド)
2. SSG ページの生成 (静的サイト生成) — 静的ルートの HTML を事前レンダリングします。
3. クライアント コンポーネントの Vite 本番ビルドを実行します (構成されている場合)
4. FastAPI アプリ用にコンパイルされたルート ツリーを生成します。

出力は `__nexy__/` に送信されます。

{% raw %}```text
__nexy__/
├── server/          — Compiled Python routes
├── client/          — Bundled JS/CSS (Vite)
├── static/          — Pre-rendered HTML (SSG)
└── manifest.json    — Build manifest
```{% endraw %}

---

## オプション

|旗 |デフォルト |説明 |
|------|--------|---------------|
| `--check` | `false` |コンパイル後に ruff + mypy を実行します。
| `--static` | `false` |完全な静的サイトのエクスポート (サーバーなし) |

 - -

＃＃ 例

{% raw %}```bash
# Build with type checking
nx build --check

# Build as static site
nx build --static
```{% endraw %}

---

## エイリアス

`nx b`