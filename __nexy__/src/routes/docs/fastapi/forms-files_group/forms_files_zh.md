# 表格和文件

接收表单数据和文件上传 - 首先安装 `python-multipart`。

{% raw %}```bash
pip install python-multipart
```{% endraw %}

## 表单数据

{% raw %}```python
from fastapi import Form

def POST(username: str = Form(), password: str = Form()):
    return {"username": username}
```{% endraw %}

### 表单模型

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

## 文件上传

{% raw %}```python
from fastapi import File, UploadFile

def POST(file: UploadFile = File()):
    contents = file.file.read()
    return {"filename": file.filename, "size": len(contents)}
```{% endraw %}

### 多个文件

{% raw %}```python
def POST(files: list[UploadFile] = File()):
    return [f.filename for f in files]
```{% endraw %}

## 表格+文件在一起

{% raw %}```python
def POST(
    file: UploadFile = File(),
    description: str = Form(),
):
    return {"file": file.filename, "description": description}
```{% endraw %}

## 限制

- 默认情况下**不**包含`python-multipart` - 显式安装它
- FBR 处理程序的工作方式相同 — 相同的导入、相同的注释
- 文件大小受服务器限制（Uvicorn / Gunicorn 配置中的默认值）