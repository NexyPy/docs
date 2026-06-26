# Python no modelo Nexy

O frontmatter (`---`) executa Python em tempo de compilação e em cada solicitação.

---

## O que você pode fazer

### Importar módulos
{% raw %}```python
---
import json
from datetime import datetime
from nexy import usePathname
from "@components/card.nexy" import Card
---
```{% endraw %}
### Executar expressões
{% raw %}```python
---
items = [1, 2, 3]
now = datetime.now()
is_admin = user.role == "admin"
---
```{% endraw %}
### Use ganchos
{% raw %}```python
---
from nexy import usePathname, useSearchParams, useCookies
pathname = usePathname()
params = useSearchParams()
cookies = useCookies()
---
```{% endraw %}
### Dados de solicitação de acesso
{% raw %}```python
---
from fastapi import Request
# request is injected automatically
---
```{% endraw %}
---

## Tempo de compilação versus tempo de execução

| Operação | Quando | Exemplo |
|---|---|---|
| `import` | Compilar | Importação de componentes |
| `prop[type]` | Compilar | Adereços verificados por tipo |
| Ganchos | Solicitação | `usePathname()` |
| Variáveis ​​| Solicitação | `user = request.user` |

As variáveis ​​definidas no frontmatter estão disponíveis no template:
{% raw %}```python
---
from datetime import datetime
year = datetime.now().year
---
<footer>&copy; {{ year }} Nexy</footer>
```{% endraw %}
---

## Lógica compartilhada

Para lógica Python reutilizável, crie um arquivo `.py` normal:
{% raw %}```python
# src/utils/helpers.py
def format_date(dt):
    return dt.strftime("%B %d, %Y")
```{% endraw %}
Importe de qualquer componente:
{% raw %}```python
---
from src.utils.helpers import format_date
from datetime import datetime
---
{{ format_date(datetime.now()) }}
```{% endraw %}
{% call Link(href="/docs/components/properties") %}Next: Properties →{% endcall %}