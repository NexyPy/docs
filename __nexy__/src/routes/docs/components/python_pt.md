# Python in Nexy Template

The frontmatter (`---`) runs Python at compile time and on each request.

---

## What you can do

### Import modules
{% raw %}```python
---
import json
from datetime import datetime
from nexy import usePathname
from "@components/card.nexy" import Card
---
```{% endraw %}
### Run expressions
{% raw %}```python
---
items = [1, 2, 3]
now = datetime.now()
is_admin = user.role == "admin"
---
```{% endraw %}
### Use hooks
{% raw %}```python
---
from nexy import usePathname, useSearchParams, useCookies
pathname = usePathname()
params = useSearchParams()
cookies = useCookies()
---
```{% endraw %}
### Access request data
{% raw %}```python
---
from fastapi import Request
# request is injected automatically
---
```{% endraw %}
---

## Compile-time vs runtime

| Operation | When | Example |
|---|---|---|
| `import` | Compile | Importing components |
| `prop[type]` | Compile | Type-checked props |
| Hooks | Request | `usePathname()` |
| Variables | Request | `user = request.user` |

Variables defined in frontmatter are available in the template:
{% raw %}```python
---
from datetime import datetime
year = datetime.now().year
---
<footer>&copy; {{ year }} Nexy</footer>
```{% endraw %}
---

## Shared logic

For reusable Python logic, create a regular `.py` file:
{% raw %}```python
# src/utils/helpers.py
def format_date(dt):
    return dt.strftime("%B %d, %Y")
```{% endraw %}
Import from any component:
{% raw %}```python
---
from src.utils.helpers import format_date
from datetime import datetime
---
{{ format_date(datetime.now()) }}
```{% endraw %}
{% call Link(href="/docs/components/properties") %}Next: Properties →{% endcall %}