# कुकीज़ और हेडर

फास्टएपीआई के `Cookie` और `Header` पैरामीटर का उपयोग करके HTTP कुकीज़ और हेडर पढ़ें।

---

## कुकी पैरामीटर
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
## एकाधिक कुकीज़
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
## हेडर पैरामीटर
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
## कस्टम हेडर उपनाम

हेडर नाम डिफ़ॉल्ट रूप से अंडरस्कोर के रूप में हाइफ़न के साथ लोअरकेस होते हैं। कस्टम हेडर नामों के लिए `alias` का उपयोग करें:
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
## टेम्पलेट्स में कुकीज़ पढ़ना

`.nexy` टेम्पलेट्स में, `useCookies()` हुक का उपयोग करें:
{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
---
<p>Session: {{ cookies.get("session_id") }}</p>
```{% endraw %}
## यह भी देखें

- [useCookies hook](/docs/hooks/useCookies) - टेम्प्लेट में कुकीज़ पढ़ने के लिए
- [Session config](/docs/config/session) - सत्र मिडलवेयर सेटअप