# Nexy 템플릿의 Python

머리말(`---`)은 컴파일 타임과 각 요청에서 Python을 실행합니다.

---

## 당신이 할 수 있는 일

### 모듈 가져오기
{% raw %}```python
---
import json
from datetime import datetime
from nexy import usePathname
from "@components/card.nexy" import Card
---
```{% endraw %}
### 표현식 실행
{% raw %}```python
---
items = [1, 2, 3]
now = datetime.now()
is_admin = user.role == "admin"
---
```{% endraw %}
### 후크를 사용하세요
{% raw %}```python
---
from nexy import usePathname, useSearchParams, useCookies
pathname = usePathname()
params = useSearchParams()
cookies = useCookies()
---
```{% endraw %}
### 액세스 요청 데이터
{% raw %}```python
---
from fastapi import Request
# request is injected automatically
---
```{% endraw %}
---

## 컴파일 시간과 런타임 비교

| 운영 | 언제 | 예 |
|---|---|---|
| `import` | 컴파일 | 구성요소 가져오기 |
| `prop[type]` | 컴파일 | 유형이 확인된 소품 |
| 후크 | 요청 | `usePathname()` |
| 변수 | 요청 | `user = request.user` |

머리말에 정의된 변수는 템플릿에서 사용할 수 있습니다.
{% raw %}```python
---
from datetime import datetime
year = datetime.now().year
---
<footer>&copy; {{ year }} Nexy</footer>
```{% endraw %}
---

## 공유 로직

재사용 가능한 Python 논리를 위해 일반 `.py` 파일을 만듭니다.
{% raw %}```python
# src/utils/helpers.py
def format_date(dt):
    return dt.strftime("%B %d, %Y")
```{% endraw %}
모든 구성요소에서 가져오기:
{% raw %}```python
---
from src.utils.helpers import format_date
from datetime import datetime
---
{{ format_date(datetime.now()) }}
```{% endraw %}
{% call Link(href="/docs/components/properties") %}Next: Properties →{% endcall %}