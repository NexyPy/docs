# Файлы cookie и заголовки (модульные)

Чтение файлов cookie и заголовков HTTP с помощью `Cookie` и `Header` FastAPI в контроллерах.

## Параметр файла cookie

{% raw %}```python
from nexy.decorators import Controller
from fastapi import Cookie

"@Controller("/profile")
class ProfileController:
    def GET(self, session_id: str | None = Cookie(None)):
        return {"session_id": session_id}
```{% endraw %}

## Несколько файлов cookie

{% raw %}```python
from fastapi import Cookie
from nexy.decorators import Controller

"@Controller("/settings")
class SettingsController:
    def GET(self, session_id: str | None = Cookie(None), theme: str = Cookie("light")):
        return {"session": session_id, "theme": theme}
```{% endraw %}

## Параметр заголовка

{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/info")
class InfoController:
    def GET(self, user_agent: str | None = Header(None)):
        return {"ua": user_agent}
```{% endraw %}

## Пользовательский псевдоним заголовка

{% raw %}```python
from fastapi import Header
from nexy.decorators import Controller

"@Controller("/secure")
class SecureController:
    def GET(self, x_token: str = Header(alias="X-Token")):
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

См. также: [useCookies hook](/docs/hooks/useCookies), [Session config](/docs/config/session)