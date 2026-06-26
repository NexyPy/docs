# 目录

为 Markdown 页面配置自动生成的目录。

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTocDepth = "2-6"
    useTocTitle = "Table of Contents"
    useTocAuto = True
```{% endraw %}

---

## 字段

|领域 |类型 |默认 |描述 |
|--------|------|---------|-------------|
| `useTocDepth` | `str` | `"2-6"` |要包含的标题级别（例如 h2 到 h4 的 `"2-4"`）。 |
| `useTocTitle` | `str` | `"On this page"` |标题显示在目录上方。 |
| `useTocAuto` | `bool` | `True` |自动生成 `.mdx` 页的目录。设置为 `False` 以禁用。 |

---

## 模板中的用法

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

## 自定义深度

{% raw %}```nexy
---
from nexy import useToc
toc_html = useToc(depth_range="1-4")
---
```{% endraw %}

仅包含 h3 到 h5：

{% raw %}```nexy
toc_html = useToc(depth_range="3-5")
```{% endraw %}