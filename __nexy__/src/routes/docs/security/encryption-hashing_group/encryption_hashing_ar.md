# التشفير والتجزئة

لا تقوم Nexy بشحن العملات المشفرة الخاصة بها — استخدم مكتبة Python القياسية وحزم الجهات الخارجية الموثوقة.

## التجزئة

### هاشليب (ستدليب)

{% raw %}```python
import hashlib

hash = hashlib.sha256(b"data").hexdigest()
```{% endraw %}

### بكريبت

{% raw %}```bash
pip install bcrypt
```{% endraw %}

{% raw %}```python
import bcrypt

hashed = bcrypt.hashpw(b"password", bcrypt.gensalt())
bcrypt.checkpw(b"password", hashed)  # True
```{% endraw %}

## التشفير

### التشفير (فيرنت المتماثل)

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

## متغيرات البيئة

لا تستخدم المفاتيح الصلبة أبدًا. استخدام متغيرات البيئة:

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

من أجل التطوير، يقرأ Nexy ملفات `.env` تلقائيًا.