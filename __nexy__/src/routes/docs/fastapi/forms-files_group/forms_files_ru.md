# Формы и файлы

Получайте данные форм и загружайте файлы — сначала установите `python-multipart`.

{% raw %}```bash
pip install python-multipart
```{% endraw %}

## Данные формы

{% raw %}```python
from fastapi import Form

def POST(username: str = Form(), password: str = Form()):
    return {"username": username}
```{% endraw %}

### Модель формы

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

## Загрузка файлов

{% raw %}```python
from fastapi import File, UploadFile

def POST(file: UploadFile = File()):
    contents = file.file.read()
    return {"filename": file.filename, "size": len(contents)}
```{% endraw %}

### Несколько файлов

{% raw %}```python
def POST(files: list[UploadFile] = File()):
    return [f.filename for f in files]
```{% endraw %}

## Формы + файлы вместе

{% raw %}```python
def POST(
    file: UploadFile = File(),
    description: str = Form(),
):
    return {"file": file.filename, "description": description}
```{% endraw %}

## Ограничения

- `python-multipart` **не** включен по умолчанию — установите его явно
- Обработчики FBR работают идентично — тот же импорт, те же аннотации.
- Размер файла ограничен сервером (по умолчанию в конфиге Uvicorn/Gunicorn)