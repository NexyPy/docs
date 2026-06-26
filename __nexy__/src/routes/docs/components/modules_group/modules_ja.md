# モジュールシステム

Nexy のモジュール システムを使用すると、プロジェクト全体でコンポーネントをインポートおよびエクスポートできます。

---

## コンポーネントのインポート

フロントマターで `import` 構文を使用します。

{% raw %}```python
---
from "@components/card.nexy" import Card
from "@components/button.nexy" import Button
---
```{% endraw %}

`"@` エイリアスは `src/` に解決されます (`nexyconfig.py` で構成可能)。

---

## 名前付きエクスポート

デフォルトでは、`.nexy` ファイルは、ファイルにちなんで名付けられたコンポーネントとしてテンプレートをエクスポートします。

|ファイル |エクスポート名 |
|---|---|
| `card.nexy` | `Card` |
| `button.nexy` | `Button` |
| `table_of_contents.nexy` | `Table_of_contents` |

---

## スロット (子)

`Slot` コンポーネントは、開始タグと終了タグの間で渡される子コンテンツをレンダリングします。

{% raw %}```nexy
<div class="card">
    {{ title }}
    <Slot />
</div>
```{% endraw %}

使用法：

{% raw %}```html
<Card title="Hello">
    <p>This goes into the Slot.</p>
</Card>
```{% endraw %}

---

## エイリアスをインポートする

名前の競合を避けるには、`as` を使用します。

{% raw %}```python
---
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
---
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

---

## 再エクスポート

コンポーネントを集約するインデックス ファイルを作成します。

{% raw %}```python
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

他のファイルはこのバレルからインポートされます。

{% raw %}```python
---
from "@components/index.nexy" import Card, Button
---
```{% endraw %}

-----

## 動的インポート

クライアント側フレームワーク (React、Solid) の場合、Nexy はビルド中にインポート ツリーを自動的に生成します。エントリ ポイントを手動で管理する必要はありません。コンパイラは `.tsx`/`.jsx` の使用状況を検出し、それに応じて Vite または esbuild を接続します。