# प्राधिकरण

गार्ड कॉलेबल्स के साथ `"@UseGuard` डेकोरेटर का उपयोग करके मार्गों को सुरक्षित रखें।

## गार्ड का अनुबंध

एक गार्ड `__call__(self, request)` के साथ कॉल करने योग्य है। ब्लॉक करने के लिए `HTTPException` बढ़ाएँ, अनुमति देने के लिए `None` लौटाएँ।
{% raw %}```python
from fastapi import HTTPException

class AdminGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)
        if "admin" not in request.user.scopes:
            raise HTTPException(403)
```{% endraw %}
---

## एक मार्ग पर पहरा देना
{% raw %}```python
---
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
---
```{% endraw %}
{% raw %}```python
from nexy.decorators import Controller, UseGuard
from starlette.authentication import requires

"@Controller("/admin")
"@UseGuard(requires("authenticated"))
class AdminController:
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}
## एकाधिक रक्षक
{% raw %}```python
---
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RateLimitGuard())
def GET():
    ...
---
```{% endraw %}
{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}
## स्टारलेट से `requires` का उपयोग करना
{% raw %}```python
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}
एफबीआर और मॉड्यूलर दोनों में काम करता है - `requires` एक वैध गार्ड कॉल करने योग्य लौटाता है।

---

##संबंधित

- ["@UseGuard reference](/docs/decorators/useguard) - पूर्ण डेकोरेटर एपीआई
- [Guards (Modular)](/docs/modular/guards) - मॉड्यूलर DI में गार्ड इंजेक्शन
- [Authentication](/docs/security/authentication) - ऑथ बैकएंड की स्थापना