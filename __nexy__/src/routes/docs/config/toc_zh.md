# Table of Contents

Configure auto-generated table of contents for Markdown pages.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTocDepth = "2-6"
    useTocTitle = "Table of Contents"
    useTocAuto = True
```{% endraw %}

---

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `useTocDepth` | `str` | `"2-6"` | Heading levels to include (e.g. `"2-4"` for h2 through h4). |
| `useTocTitle` | `str` | `"On this page"` | Title displayed above the TOC. |
| `useTocAuto` | `bool` | `True` | Auto-generate TOC for `.mdx` pages. Set to `False` to disable. |

---

## Usage in templates

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

## Custom depth

{% raw %}```nexy
---
from nexy import useToc
toc_html = useToc(depth_range="1-4")
---
```{% endraw %}

Include only h3 through h5:

{% raw %}```nexy
toc_html = useToc(depth_range="3-5")
```{% endraw %}