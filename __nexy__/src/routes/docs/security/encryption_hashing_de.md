# Encryption & Hashing

Nexy does not ship its own crypto — use Python's standard library and trusted third-party packages.

## Hashing

### hashlib (stdlib)

{% raw %}```python
import hashlib

hash = hashlib.sha256(b"data").hexdigest()
```{% endraw %}

### bcrypt

{% raw %}```bash
pip install bcrypt
```{% endraw %}

{% raw %}```python
import bcrypt

hashed = bcrypt.hashpw(b"password", bcrypt.gensalt())
bcrypt.checkpw(b"password", hashed)  # True
```{% endraw %}

## Encryption

### cryptography (Fernet symmetric)

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

## Environment Variables

Never hardcode keys. Use environment variables:

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

For development, Nexy reads `.env` files automatically.