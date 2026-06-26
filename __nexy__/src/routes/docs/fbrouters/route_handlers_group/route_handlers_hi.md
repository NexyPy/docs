# रूट हैंडलर (एपीआई)

रूट हैंडलर `src/routes/` में एक `.py` फ़ाइल है जो एक एपीआई एंडपॉइंट को उजागर करता है। पृष्ठों (`.nexy` / `.mdx`) के विपरीत, हैंडलर JSON या कच्चा डेटा लौटाते हैं।

---

## एक हैंडलर बनाना
{% raw %}```bash
routes/
└── api/
    └── hello.py           →  GET /api/hello
```{% endraw %}
{% raw %}```python
# api/hello.py
from fastapi import Request

async def GET(request: Request):
    return {"message": "Hello from Nexy!"}
```{% endraw %}

नेक्सि मैप्स HTTP विधियों के फ़ंक्शन नाम: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`।

---

## उपलब्ध HTTP विधियाँ

एक फ़ाइल में प्रति विधि एक फ़ंक्शन परिभाषित करें:
{% raw %}```python
# routes/api/items.py
from fastapi import Request

async def GET(request: Request):
    return {"items": []}

async def POST(request: Request):
    data = await request.json()
    return {"created": data}

async def DELETE(request: Request, id: int):
    return {"deleted": id}
```{% endraw %}

प्रत्येक फ़ंक्शन `GET`, `POST`, `DELETE` पर `/api/items` से मेल खाता है।

---

## अनुरोध शरीर
{% raw %}```python
# routes/api/users.py
from pydantic import BaseModel

class CreateUser(BaseModel):
    name: str
    email: str

async def POST(request: Request, body: CreateUser):
    return {"name": body.name, "email": body.email}
```{% endraw %}
फास्टएपीआई स्वचालित रूप से बॉडी को मान्य करता है - अमान्य इनपुट पर 422 लौटाता है।

---

## स्थिति कोड

`JSONResponse` के साथ `status_code` लौटाएँ:
{% raw %}```python
from fastapi.responses import JSONResponse

async def POST(request: Request):
    return JSONResponse({"created": True}, status_code=201)
```{% endraw %}
---

## रूट पैरामीटर
{% raw %}```python
# routes/api/users/[id].py
from fastapi import Request

async def GET(request: Request, id: int):
    return {"user_id": id}
```{% endraw %}
डायनामिक सेगमेंट (`[id]`) को स्वचालित प्रकार रूपांतरण के साथ कीवर्ड तर्क के रूप में इंजेक्ट किया जाता है।

---

## निर्भरता

फास्टएपीआई का `Depends`, `Header`, `Query`, `Cookie` मूल रूप से काम करता है:
{% raw %}```python
from fastapi import Depends, Header, Query

def get_db():
    return {"connection": "ok"}

async def GET(request: Request, db=Depends(get_db), x_api_key: str = Header(None)):
    return {"db": db, "api_key": x_api_key}
```{% endraw %}
---

## प्रतिक्रियाएँ

| वापसी प्रकार | प्रतिक्रिया |
|---|----------|
| `dict` | `application/json` |
| `list` | `application/json` |
| `str` | `text/plain` |
| `BaseModel` | `application/json` |
| `Response` | कस्टम (कोई भी) |
| `None` | `200 OK` खाली |

---

## सर्वोत्तम प्रथाएँ

- एक `.py` फ़ाइल = एक रूट पथ
- HTTP विधियों से मेल खाने वाले फ़ंक्शन नामों का उपयोग करें (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- अनुरोध सत्यापन के लिए पाइडेंटिक मॉडल का उपयोग करें
- कस्टम स्टेटस कोड के लिए `JSONResponse` का उपयोग करें
- क्लाइंट-ट्रिगर म्यूटेशन के लिए, [Actions](/docs/guides/actions) देखें