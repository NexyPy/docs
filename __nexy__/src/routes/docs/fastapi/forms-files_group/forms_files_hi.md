# फॉर्म और फ़ाइलें

फ़ॉर्म डेटा और फ़ाइल अपलोड प्राप्त करें - पहले `python-multipart` इंस्टॉल करें।

{% raw %}```bash
pip install python-multipart
```{% endraw %}

## फॉर्म डेटा

{% raw %}```python
from fastapi import Form

def POST(username: str = Form(), password: str = Form()):
    return {"username": username}
```{% endraw %}

### फॉर्म मॉडल

{% raw %}```python
from pydantic import BaseModel
from fastapi import Form, Depends

class LoginForm(BaseModel):
    username: str
    password: str

    "@classmethod
    def as_form(cls, username: str = Form(), password: str = Form()):
        return cls(username=username, password=password)

def POST(form: LoginForm = Depends(LoginForm.as_form)):
    ...
```{% endraw %}

## फ़ाइल अपलोड

{% raw %}```python
from fastapi import File, UploadFile

def POST(file: UploadFile = File()):
    contents = file.file.read()
    return {"filename": file.filename, "size": len(contents)}
```{% endraw %}

### एकाधिक फ़ाइलें

{% raw %}```python
def POST(files: list[UploadFile] = File()):
    return [f.filename for f in files]
```{% endraw %}

## फॉर्म + फ़ाइलें एक साथ

{% raw %}```python
def POST(
    file: UploadFile = File(),
    description: str = Form(),
):
    return {"file": file.filename, "description": description}
```{% endraw %}

## सीमाएँ

- `python-multipart` डिफ़ॉल्ट रूप से **नहीं** शामिल है - इसे स्पष्ट रूप से इंस्टॉल करें
- एफबीआर हैंडलर समान रूप से काम करते हैं - समान आयात, समान एनोटेशन
- फ़ाइल का आकार सर्वर द्वारा सीमित है (यूविकॉर्न/गुनिकॉर्न कॉन्फ़िगरेशन में डिफ़ॉल्ट)