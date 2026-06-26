# Chiffrement et hachage

Nexy ne fournit pas sa propre cryptographie : utilisez la bibliothèque standard de Python et des packages tiers de confiance.

## Hachage

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

## Chiffrement

### cryptographie (Fernet symétrique)

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

## Variables d'environnement

Ne codez jamais les clés en dur. Utilisez des variables d'environnement :

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

Pour le développement, Nexy lit automatiquement les fichiers `.env`.