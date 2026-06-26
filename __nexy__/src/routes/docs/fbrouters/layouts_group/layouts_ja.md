# レイアウト

レイアウトは、ディレクトリ内のすべてのページをラップする `layout.nexy` ファイルです。すべてのページで同じヘッダー、サイドバー、またはフッターが繰り返されるのを防ぎます。

---

## 仕組み

`layout.nexy` を `routes/` ディレクトリ内に配置します。 Nexy は、ルート自体を作成せずに、すべての兄弟ページにそれを自動的に適用します。
{% raw %}```bash
routes/
├── layout.nexy           ← Applied to / and /about
├── index.nexy
├── about.nexy
└── blog/
    ├── layout.nexy       ← Applied to /blog/...
    ├── index.nexy
    └── [slug].nexy
```{% endraw %}
---

## 構文

レイアウトは、`children:prop[str]` を介して子コンテンツを受け取ります。
{% raw %}```
---
children: prop[str]
---
<header class="site-header">
    <nav>...</nav>
</header>
{{ children | safe }}
<footer>...</footer>
```{% endraw %}
---

## ネストされたレイアウト

レイアウトは階層的にネストされます。 `blog/[slug].nexy` のページは、最初に `blog/layout.nexy` を受け取り、次にルート `layout.nexy` を受け取ります。
{% raw %}```bash
routes/
├── layout.nexy           ← Global layout (header, footer)
└── blog/
    ├── layout.nexy       ← Blog layout (category sidebar)
    └── [slug].nexy       ← Page → blog/layout → root/layout
```{% endraw %}
---

## 実際の例

これらのドキュメント (`src/routes/docs/layout.nexy`) のレイアウトでは、`usePathname`、`Sidebar`、および `Table_of_contents` が使用されます。
{% raw %}```python
from nexy import usePathname
from "@components/docs/sidebar.nexy" import Sidebar
from "@components/docs/table_of_contents.nexy" import Table_of_contents
```{% endraw %}
{% raw %}```html
<main>
    <Sidebar />
    {{ children | safe }}
    <Table_of_contents />
</main>
```{% endraw %}
{% call Link(href="/docs/fbrouters/dependencies") %}Next: Dependencies →{% endcall %}