# Содержание

Настройте автоматически создаваемое оглавление для страниц Markdown.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTocDepth = "2-6"
    useTocTitle = "Table of Contents"
    useTocAuto = True
```{% endraw %}

---

## Поля

| Поле | Тип | По умолчанию | Описание |
|-------|------|---------|-------------|
| `useTocDepth` | `str` | `"2-6"` | Уровни заголовков, которые необходимо включить (например, `"2-4"` для h2–h4). |
| `useTocTitle` | `str` | `"On this page"` | Название отображается над оглавлением. |
| `useTocAuto` | `bool` | `True` | Автоматическое создание содержания для страниц `.mdx`. Установите `False` для отключения. |

---

## Использование в шаблонах

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

## Пользовательская глубина

{% raw %}```nexy
---
from nexy import useToc
toc_html = useToc(depth_range="1-4")
---
```{% endraw %}

Включайте только h3–h5:

{% raw %}```nexy
toc_html = useToc(depth_range="3-5")
```{% endraw %}