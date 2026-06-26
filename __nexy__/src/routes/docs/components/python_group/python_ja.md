# Nexy テンプレートの Python

フロントマター (`---`) は、コンパイル時およびリクエストごとに Python を実行します。

---

## あなたにできること

### モジュールをインポートする
{% raw %}```python
---
import json
from datetime import datetime
from nexy import usePathname
from "@components/card.nexy" import Card
---
```{% endraw %}
### 式を実行する
{% raw %}```python
---
items = [1, 2, 3]
now = datetime.now()
is_admin = user.role == "admin"
---
```{% endraw %}
### フックを使用する
{% raw %}```python
---
from nexy import usePathname, useSearchParams, useCookies
pathname = usePathname()
params = useSearchParams()
cookies = useCookies()
---
```{% endraw %}
### アクセス要求データ
{% raw %}```python
---
from fastapi import Request
# request is injected automatically
---
```{% endraw %}
---

## コンパイル時間と実行時間

|操作 |いつ |例 |
|---|---|---|
| `import` |コンパイル |コンポーネントのインポート |
| `prop[type]` |コンパイル |型チェックされた小道具 |
|フック |リクエスト | `usePathname()` |
|変数 |リクエスト | `user = request.user` |

フロントマターで定義された変数は、テンプレートで使用できます。
{% raw %}```python
---
from datetime import datetime
year = datetime.now().year
---
<footer>&copy; {{ year }} Nexy</footer>
```{% endraw %}
---

## 共有ロジック

再利用可能な Python ロジックの場合は、通常の `.py` ファイルを作成します。
{% raw %}```python
# src/utils/helpers.py
def format_date(dt):
    return dt.strftime("%B %d, %Y")
```{% endraw %}
任意のコンポーネントからインポートします。
{% raw %}```python
---
from src.utils.helpers import format_date
from datetime import datetime
---
{{ format_date(datetime.now()) }}
```{% endraw %}
{% call Link(href="/docs/components/properties") %}Next: Properties →{% endcall %}