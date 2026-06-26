# Шифрование и хеширование

Nexy не предлагает собственную криптографию — используйте стандартную библиотеку Python и проверенные сторонние пакеты.

## Хеширование

### хеш-библиотека (stdlib)

{% raw %}```python
import hashlib

hash = hashlib.sha256(b"data").hexdigest()
```{% endraw %}

### шифрование

{% raw %}```bash
pip install bcrypt
```{% endraw %}

{% raw %}```python
import bcrypt

hashed = bcrypt.hashpw(b"password", bcrypt.gensalt())
bcrypt.checkpw(b"password", hashed)  # True
```{% endraw %}

## Шифрование

### криптография (симметричная по Ферне)

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

## Переменные среды

Никогда не кодируйте ключи жестко. Используйте переменные среды:

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

Для разработки Nexy автоматически читает файлы `.env`.