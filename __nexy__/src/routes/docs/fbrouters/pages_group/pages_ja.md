# ページ

ページは HTML を返すルートです。 Nexy では、ページは `src/routes/` の下の `.nexy` または `.mdx` ファイルです。

> ページは、JSON または生データを返す **ルート ハンドラー** (`.py` ファイル) とは異なります。

---

## ページの作成

`.nexy` または `.mdx` ファイルを `src/routes/` に配置します。
{% raw %}```bash
src/
└── routes/
    └── index.nexy       →  /
```{% endraw %}
{% raw %}```html
<!-- index.nexy -->
<h1>Hello Nexy!</h1>
```{% endraw %}
ルート登録は必要ありません。ファイルはルートです**。

---

## ページ (`.nexy`)

`.nexy` ファイルには、Python フロントマターと HTML テンプレートを含めることができます。
{% raw %}```
---
items: prop[list] = []
---
<ul>
{% for item in items %}
    {{ item }}
{% endfor %}
</ul>
```{% endraw %}
---

## ページ (`.mdx`)

`.mdx` ファイルは、Markdown と Nexy コンポーネントを組み合わせます。
{% raw %}```mdx
---
from "@components/link.nexy" import Link
---

# My Article

<Link href="/docs">Back to docs</Link>
```{% endraw %}
あなたが読んでいるこのページ自体は `.mdx` ファイルです。目次、サイドバー、ブレッドクラムはレイアウトによって処理されます。

---

## ルーティング不可能な特殊ファイル

`routes/` 内の一部のファイルはルートを作成しません:

|ファイル |役割 |
|---|---|
| `__init__.py` | Python パッケージ マーカー |
| `layout.nexy` |共有レイアウト ラッパー |
| `dependencies.py` |共有依存関係 |
{% call Link(href="/docs/fbrouters/layouts") %}Next: Layouts →{% endcall %}