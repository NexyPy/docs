# प्राधिकरण (एफबीआर)

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

## एक मार्ग पर पहरा देना

{% raw %}```python
# src/routes/admin.py
from nexy.decorators import UseGuard
from starlette.authentication import requires

class AuthGuard:
    def __call__(self, request):
        if not request.user:
            raise HTTPException(401)

"@UseGuard(AuthGuard())
def GET():
    ...
```{% endraw %}

## स्टारलेट के `requires` का उपयोग करना

{% raw %}```python
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
```{% endraw %}

## एकाधिक रक्षक

{% raw %}```python
from nexy.decorators import UseGuard

"@UseGuard(AuthGuard(), RoleGuard("admin"))
def GET():
    ...
```{% endraw %}

---

यह भी देखें: ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)