# Cookie 和标头 (FBR)

使用 FastAPI 的 `Cookie` 和 `Header` 参数读取 HTTP cookie 和标头。

## Cookie 参数

{% raw %}```python
# src/routes/profile.py
from fastapi import Cookie

def GET(session_id: str | None = Cookie(None)):
    return {"session_id": session_id}
```{% endraw %}

## 多个cookie

{% raw %}```python
from fastapi import Cookie

def GET(
    session_id: str | None = Cookie(None),
    theme: str = Cookie("light"),
):
    return {"session": session_id, "theme": theme}
```{% endraw %}

## 标头参数

{% raw %}```python
from fastapi import Header

def GET(user_agent: str | None = Header(None)):
    return {"ua": user_agent}
```{% endraw %}

## 自定义标头别名

{% raw %}```python
from fastapi import Header

def GET(x_token: str = Header(alias="X-Token")):
    return {"token": x_token}
```{% endraw %}

默认情况下，标头名称为小写字母，连字符为下划线。使用 `alias` 作为自定义名称。

## 读取模板中的cookie

在 `.nexy` 模板中，使用 `useCookies()` 钩子：

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}

---

另请参阅：[Session config](/docs/config/session)