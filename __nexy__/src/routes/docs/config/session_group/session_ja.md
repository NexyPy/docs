# セッション

署名付き Cookie セッション用にセッション ミドルウェアを構成します。サーバー側のストレージは必要ありません。

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useSession = {
        "secret_key": "your-secret-key",
        "max_age": 3600,
        "same_site": "lax",
        "https_only": False,
    }
```{% endraw %}

ボンネットの下にはスターレットの`SessionMiddleware`を使用しています。

---

## フィールド

|フィールド |タイプ |デフォルト |説明 |
|----------|------|----------|---------------|
| `secret_key` | `str` |必須 |セッション Cookie に署名するための秘密鍵 |
| `max_age` | `int` | `1209600` (14 日間) |セッション Cookie の最大存続期間 (秒) |
| `same_site` | `str` | `"lax"` | SameSite ポリシー (`"lax"`、`"strict"`、`"none"`) |
| `https_only` | `bool` | `False` | Cookie を HTTPS 経由でのみ送信する |

 - -

＃＃ 使用法

{% raw %}```python
from nexy import useSession

session = useSession()
session["user_id"] = 123
session["role"] = "admin"
```{% endraw %}

セッションは辞書のように動作します - 割り当て、読み取り、削除:

{% raw %}```python
session = useSession()
user_id = session.get("user_id")
del session["user_id"]
```{% endraw %}

---

## Flash メッセージのパターン

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append({"type": "success", "text": "Saved!"})
session["_flashes"] = flashes
```{% endraw %}

次に、テンプレートを読んでクリアします。

{% raw %}```python
session = useSession()
flashes = session.pop("_flashes", [])
```{% endraw %}

---

## セキュリティに関する注意事項

- セッション データは署名されていますが、**暗号化されていません** - 機密データは保存しないでください
- 本番環境で `secret_key` を定期的にローテーションします
- 本番環境では `https_only=True` を使用します