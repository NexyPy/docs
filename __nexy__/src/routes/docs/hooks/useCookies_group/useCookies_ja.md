# useCookies

現在のリクエストからの Cookie を辞書として返します。

{% raw %}```python
from nexy import useCookies

cookies = useCookies()
```{% endraw %}

---

## 戻り値

`dict` — リクエストとともに送信されたすべての Cookie。

 - -

＃＃ 例

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
locale = cookies.get("nexy-locale", "en")
---
<html lang="{{ locale }}">
```{% endraw %}

---

## 使用上の注意

- 読み取り専用 — Cookie の設定には `useSession` を使用します
- Cookie の値は文字列です
- FastAPI の `request.cookies` に相当