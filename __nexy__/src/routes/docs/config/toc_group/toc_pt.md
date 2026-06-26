# Índice

Configure o índice gerado automaticamente para páginas Markdown.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTocDepth = "2-6"
    useTocTitle = "Table of Contents"
    useTocAuto = True
```{% endraw %}

---

## Campos

| Campo | Tipo | Padrão | Descrição |
|-------|------|---------|------------|
| `useTocDepth` | `str` | `"2-6"` | Níveis de título a serem incluídos (por exemplo, `"2-4"` para h2 a h4). |
| `useTocTitle` | `str` | `"On this page"` | Título exibido acima do sumário. |
| `useTocAuto` | `bool` | `True` | Gerar sumário automaticamente para páginas `.mdx`. Defina como `False` para desativar. |

---

## Uso em modelos

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

## Profundidade personalizada

{% raw %}```nexy
---
from nexy import useToc
toc_html = useToc(depth_range="1-4")
---
```{% endraw %}

Inclui apenas h3 a h5:

{% raw %}```nexy
toc_html = useToc(depth_range="3-5")
```{% endraw %}