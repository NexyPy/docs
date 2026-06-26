# クッキーとヘッダー

FastAPI の `Cookie` および `Header` パラメータを使用して、HTTP Cookie とヘッダーを読み取ります。

---

## クッキーパラメータ
{% raw %}```python
---
from fastapi import Cookie

def GET(session_id: str | None = Cookie(None)):
    return {"session_id": session_id}
---
```{% endraw %}
{% raw %}```python
from fastapi import Cookie
from nexy.decorators import Controller

"@Controller("/profile")
class ProfileController:
    def GET(self, session_id: str | None = Cookie(None)):
        return {"session_id": session_id}
```{% endraw %}
## 複数の Cookie
{% raw %}```python
---
from fastapi import Cookie

def GET(
    session_id: str | None = Cookie(None),
    theme: str = Cookie("light"),
):
    return {"session": session_id, "theme": theme}
---
```{% endraw %}
{% raw %}```python
from fastapi import Cookie
from nexy.decorators import Controller

"@Controller("/settings")
class SettingsController:
    def GET(self, session_id: str | None = Cookie(None), theme: str = Cookie("light")):
        return {"session": session_id, "theme": theme}
```{% endraw %}
## ヘッダーパラメータ
{% raw %}```python
---
from fastapi import Header

def GET(user_agent: str | None = Header(None)):
    return {"ua": user_agent}
---
```{% endraw %}
{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/info")
class InfoController:
    def GET(self, user_agent: str | None = Header(None)):
        return {"ua": user_agent}
```{% endraw %}
## カスタムヘッダーエイリアス

デフォルトでは、ヘッダー名は小文字でハイフンがアンダースコアとして使用されます。カスタムヘッダー名には `alias` を使用します。
{% raw %}```python
---
from fastapi import Header

def GET(x_token: str = Header(alias="X-Token")):
    return {"token": x_token}
---
```{% endraw %}
{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/secure")
class SecureController:
    def GET(self, x_token: str = Header(alias="X-Token")):
        return {"token": x_token}
```{% endraw %}
## テンプレート内の Cookie の読み取り

`.nexy` テンプレートでは、`useCookies()` フックを使用します。
{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}
## も参照

- [useCookies hook](/docs/hooks/useCookies) — テンプレート内の Cookie の読み取り用
- [Session config](/docs/config/session) — セッションミドルウェアのセットアップ