# Cookie とヘッダー (FBR)

FastAPI の `Cookie` および `Header` パラメータを使用して、HTTP Cookie とヘッダーを読み取ります。

## クッキーパラメータ

{% raw %}```python
# src/routes/profile.py
from fastapi import Cookie

def GET(session_id: str | None = Cookie(None)):
    return {"session_id": session_id}
```{% endraw %}

## 複数の Cookie

{% raw %}```python
from fastapi import Cookie

def GET(
    session_id: str | None = Cookie(None),
    theme: str = Cookie("light"),
):
    return {"session": session_id, "theme": theme}
```{% endraw %}

## ヘッダーパラメータ

{% raw %}```python
from fastapi import Header

def GET(user_agent: str | None = Header(None)):
    return {"ua": user_agent}
```{% endraw %}

## カスタムヘッダーエイリアス

{% raw %}```python
from fastapi import Header

def GET(x_token: str = Header(alias="X-Token")):
    return {"token": x_token}
```{% endraw %}

デフォルトでは、ヘッダー名は小文字でハイフンがアンダースコアとして使用されます。カスタム名には `alias` を使用します。

## テンプレート内の Cookie の読み取り

`.nexy` テンプレートでは、`useCookies()` フックを使用します。

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}

---

参照: [Session config](/docs/config/session)