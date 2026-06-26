# गार्ड और प्राधिकरण (मॉड्यूलर)

गार्ड कॉलेबल्स के साथ `"@UseGuard` का उपयोग करके नियंत्रकों और मार्गों को सुरक्षित रखें।

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

## नियंत्रक स्तर का गार्ड

{% raw %}```python
from nexy.decorators import Controller, UseGuard

class AuthGuard:
    def __call__(self, request):
        if not request.user.is_authenticated:
            raise HTTPException(401)

"@Controller("/admin")
"@UseGuard(AuthGuard())
class AdminController:
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

## एकाधिक रक्षक

{% raw %}```python
"@UseGuard(AuthGuard(), RoleGuard("admin"))
class AdminController:
    def GET(self):
        ...
```{% endraw %}

क्लास-स्तरीय गार्ड विधि-स्तरीय गार्ड से पहले चलते हैं। सभी FastAPI `Depends` के रूप में चलते हैं।

## विधि-स्तरीय गार्ड

{% raw %}```python
from nexy.decorators import Controller, UseGuard

"@Controller("/users")
class UsersController:
    "@UseGuard(AuthGuard())
    def GET(self, request):
        return {"user": request.user.username}
```{% endraw %}

नियंत्रक और विधि दोनों स्तरों पर काम करता है।

---

यह भी देखें: [Guards](/docs/modular/guards), ["@UseGuard reference](/docs/decorators/useguard), [Authentication](/docs/security/authentication)