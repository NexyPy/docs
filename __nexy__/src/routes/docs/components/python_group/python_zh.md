# Nexy 模板中的 Python

frontmatter (`---`) 在编译时和每次请求时运行 Python。

---

## 你可以做什么

### 导入模块
{% raw %}```python
---
import json
from datetime import datetime
from nexy import usePathname
from "@components/card.nexy" import Card
---
```{% endraw %}
### 运行表达式
{% raw %}```python
---
items = [1, 2, 3]
now = datetime.now()
is_admin = user.role == "admin"
---
```{% endraw %}
### 使用钩子
{% raw %}```python
---
from nexy import usePathname, useSearchParams, useCookies
pathname = usePathname()
params = useSearchParams()
cookies = useCookies()
---
```{% endraw %}
### 访问请求数据
{% raw %}```python
---
from fastapi import Request
# request is injected automatically
---
```{% endraw %}
---

## 编译时与运行时

|运营|当 |示例|
|---|---|---|
| `import` |编译|导入组件|
| `prop[type]` |编译|经过类型检查的道具 |
|挂钩|请求| `usePathname()` |
|变量|请求| `user = request.user` |

frontmatter 中定义的变量在模板中可用：
{% raw %}```python
---
from datetime import datetime
year = datetime.now().year
---
<footer>&copy; {{ year }} Nexy</footer>
```{% endraw %}
---

## 共享逻辑

对于可重用的 Python 逻辑，创建一个常规的 `.py` 文件：
{% raw %}```python
# src/utils/helpers.py
def format_date(dt):
    return dt.strftime("%B %d, %Y")
```{% endraw %}
从任何组件导入：
{% raw %}```python
---
from src.utils.helpers import format_date
from datetime import datetime
---
{{ format_date(datetime.now()) }}
```{% endraw %}
{% call Link(href="/docs/components/properties") %}Next: Properties →{% endcall %}