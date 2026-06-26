# useSession

現在のリクエストのセッション ディクショナリを返します。セッションは署名付き Cookie によって裏付けられており、サーバー側のストレージはありません。

{% raw %}```python
from nexy import useSession

session = useSession()
```{% endraw %}

---

## 戻り値

`dict` — 署名付き Cookie からのセッション データ。セッションが存在しない場合は空の辞書を返します。

 - -

＃＃ 例

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
user_id = session.get("user_id")
---
{% if user_id %}
    <p>Logged in as user {{ user_id }}</p>
{% else %}
    <p>Guest</p>
{% endif %}
```{% endraw %}

---

## セッションデータの書き込み

{% raw %}```python
session = useSession()
session["user_id"] = 123
session["role"] = "admin"
del session["_flash"]
```{% endraw %}

---

## Flash メッセージのパターン

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append("Item saved!")
session["_flashes"] = flashes
```{% endraw %}

---

## 使用上の注意

- `nexyconfig.py` に `useSession` 構成が必要です
- セッションデータは署名されていますが、**暗号化されていません**
- サーバー側ストレージなし - すべてが Cookie 内にあります