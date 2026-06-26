# النماذج والملفات

تلقي بيانات النموذج وتحميل الملفات — قم بتثبيت `python-multipart` أولاً.

{% raw %}```bash
pip install python-multipart
```{% endraw %}

## بيانات النموذج

{% raw %}```python
from fastapi import Form

def POST(username: str = Form(), password: str = Form()):
    return {"username": username}
```{% endraw %}

### نموذج النموذج

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

## تحميل الملفات

{% raw %}```python
from fastapi import File, UploadFile

def POST(file: UploadFile = File()):
    contents = file.file.read()
    return {"filename": file.filename, "size": len(contents)}
```{% endraw %}

### ملفات متعددة

{% raw %}```python
def POST(files: list[UploadFile] = File()):
    return [f.filename for f in files]
```{% endraw %}

## النماذج + الملفات معًا

{% raw %}```python
def POST(
    file: UploadFile = File(),
    description: str = Form(),
):
    return {"file": file.filename, "description": description}
```{% endraw %}

## القيود

- `python-multipart` **غير** مضمن بشكل افتراضي — قم بتثبيته بشكل صريح
- تعمل معالجات FBR بشكل متطابق - نفس الواردات ونفس التعليقات التوضيحية
- حجم الملف محدود بواسطة الخادم (الإعدادات الافتراضية في تكوين Uvicorn / Gunicorn)