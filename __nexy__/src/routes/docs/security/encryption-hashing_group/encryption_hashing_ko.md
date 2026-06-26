# 암호화 및 해싱

Nexy는 자체 암호화폐를 제공하지 않습니다. Python의 표준 라이브러리와 신뢰할 수 있는 타사 패키지를 사용하세요.

## 해싱

### hashlib (stdlib)

{% raw %}```python
import hashlib

hash = hashlib.sha256(b"data").hexdigest()
```{% endraw %}

### 비크립트

{% raw %}```bash
pip install bcrypt
```{% endraw %}

{% raw %}```python
import bcrypt

hashed = bcrypt.hashpw(b"password", bcrypt.gensalt())
bcrypt.checkpw(b"password", hashed)  # True
```{% endraw %}

## 암호화

### 암호화(Fernet 대칭)

{% raw %}```bash
pip install cryptography
```{% endraw %}

{% raw %}```python
from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)

token = cipher.encrypt(b"secret data")
cipher.decrypt(token)  # b"secret data"
```{% endraw %}

## 환경 변수

키를 하드코딩하지 마세요. 환경 변수를 사용하십시오.

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

개발을 위해 Nexy는 `.env` 파일을 자동으로 읽습니다.