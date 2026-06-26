# データのロード

Nexy は、データをロードするための 2 つのレイヤーを提供します。`.nexy` フロントマターの **コンパイル時**、およびフック経由の **リクエスト時**です。

## コンパイル時データ (フロントマター)

`.nexy` ファイル内の `---` ブロックは、コンパイル時に実行される Python です。そこで定義された変数はテンプレートで使用できます。

{% raw %}```nexy
---
import json
from src.data import get_items
items = get_items()
total = len(items)
---
<ul>
{% for item in items %}
  {{ item.name }}
{% endfor %}
</ul>
<p>Total: {{ total }} items</p>
```{% endraw %}

JSON データを直接インポートすることもできます。

{% raw %}```nexy
---
import "./data.json" as data
---
{{ data | tojson }}
```{% endraw %}

## リクエスト時のデータ (フック)

フックは HTTP リクエスト中に実行され、リクエスト コンテキストにアクセスできます。

{% raw %}```python
from nexy import useQuery, useSearchParams, useSession, useCookies

# URL path parameters (from [param] in filename)
id = useQuery("id")

# Query string parameters
params = useSearchParams()  # {"page": "1", "sort": "asc"}

# Session data (requires session middleware)
user = useSession().get("user")

# Cookies
token = useCookies().get("token")
```{% endraw %}

## API ルート ハンドラー

データベースまたは外部 API から取得したデータの場合は、`.py` ファイルに専用の API ハンドラーを作成します。

{% raw %}```python
# src/routes/api/items.py
from myapp.db import get_items

def GET():
    return get_items()

def POST(data: dict):
    # data is parsed from request body automatically
    return {"created": True, "id": data.get("id")}
```{% endraw %}

次に、`fetch` またはサーバー側インクルードを介してページから呼び出します。

## `useViews` を含む動的インクルード

リクエスト時に現在のページ内に別のページのコンポーネントをレンダリングします。

{% raw %}```python
from nexy import useViews
sidebar = useViews("/components/sidebar.nexy", {"active": "docs"})
```{% endraw %}

テンプレートに埋め込むことができる `HTMLResponse` を返します。