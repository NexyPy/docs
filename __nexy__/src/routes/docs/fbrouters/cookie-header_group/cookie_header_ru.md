# Файлы cookie и заголовки (FBR)

Чтение файлов cookie и заголовков HTTP с использованием параметров FastAPI `Cookie` и `Header`.

## Параметр файла cookie

{% raw %}```python
# src/routes/profile.py
from fastapi import Cookie

def GET(session_id: str | None = Cookie(None)):
    return {"session_id": session_id}
```{% endraw %}

## Несколько файлов cookie

{% raw %}```python
from fastapi import Cookie

def GET(
    session_id: str | None = Cookie(None),
    theme: str = Cookie("light"),
):
    return {"session": session_id, "theme": theme}
```{% endraw %}

## Параметр заголовка

{% raw %}```python
from fastapi import Header

def GET(user_agent: str | None = Header(None)):
    return {"ua": user_agent}
```{% endraw %}

## Пользовательский псевдоним заголовка

{% raw %}```python
from fastapi import Header

def GET(x_token: str = Header(alias="X-Token")):
    return {"token": x_token}
```{% endraw %}

По умолчанию имена заголовков пишутся строчными буквами с дефисами в качестве подчеркивания. Используйте `alias` для пользовательских имен.

## Чтение файлов cookie в шаблонах

В шаблонах `.nexy` используйте хук `useCookies()`:

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}

---

См. также: [Session config](/docs/config/session)