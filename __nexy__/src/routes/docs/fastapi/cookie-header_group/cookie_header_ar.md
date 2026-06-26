# ملفات تعريف الارتباط والعناوين

اقرأ ملفات تعريف الارتباط والرؤوس الخاصة بـ HTTP باستخدام معلمات FastAPI `Cookie` و`Header`.

---

## معلمة ملفات تعريف الارتباط
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
## ملفات تعريف الارتباط المتعددة
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
## معلمة الرأس
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
## الاسم المستعار للرأس المخصص

تكون أسماء الرؤوس بأحرف صغيرة مع وجود واصلات كشرطات سفلية بشكل افتراضي. استخدم `alias` لأسماء الرؤوس المخصصة:
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
## قراءة ملفات تعريف الارتباط في القوالب

في قوالب `.nexy`، استخدم الخطاف `useCookies()`:
{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}
## أنظر أيضا

- [useCookies hook](/docs/hooks/useCookies) — لقراءة ملفات تعريف الارتباط في القوالب
- [Session config](/docs/config/session) — إعداد البرامج الوسيطة للجلسة