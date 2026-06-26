# 目次

Markdown ページの自動生成された目次を構成します。

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTocDepth = "2-6"
    useTocTitle = "Table of Contents"
    useTocAuto = True
```{% endraw %}

---

## フィールド

|フィールド |タイプ |デフォルト |説明 |
|----------|------|----------|---------------|
| `useTocDepth` | `str` | `"2-6"` |含める見出しレベル (例: h2 ～ h4 の `"2-4"`)。 |
| `useTocTitle` | `str` | `"On this page"` |タイトルは目次の上に表示されます。 |
| `useTocAuto` | `bool` | `True` | `.mdx` ページの目次を自動生成します。無効にするには、`False` に設定します。 |

---

## テンプレートでの使用法

{% raw %}```nexy
---
from nexy import useToc
toc_html = useToc()
---
<aside class="toc">
    {{ toc_html | safe }}
</aside>
```{% endraw %}

---

## カスタムの深さ

{% raw %}```nexy
---
from nexy import useToc
toc_html = useToc(depth_range="1-4")
---
```{% endraw %}

h3 ～ h5 のみを含めます。

{% raw %}```nexy
toc_html = useToc(depth_range="3-5")
```{% endraw %}