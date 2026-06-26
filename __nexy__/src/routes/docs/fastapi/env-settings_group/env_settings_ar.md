# البيئة والإعدادات

إدارة التكوين باستخدام متغيرات البيئة وملفات `.env`.

## `.env` ملفات

يقرأ Nexy ملفات `.env` تلقائيًا عند بدء التشغيل (عبر `python-dotenv`).

{% raw %}```env
# .env
DATABASE_URL=postgresql://localhost/mydb
SECRET_KEY=change-me-in-production
DEBUG=true
```{% endraw %}

الوصول إليهم عبر `os.environ`:

{% raw %}```python
import os

DATABASE_URL = os.environ["DATABASE_URL"]
```{% endraw %}

## إعدادات Pydantic

للإعدادات المكتوبة مع التحقق من الصحة:

{% raw %}```bash
pip install pydantic-settings
```{% endraw %}

{% raw %}```python
# src/settings.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///dev.db"
    secret_key: str = "dev-key"
    debug: bool = True

    model_config = {"env_file": ".env"}

settings = Settings()
```{% endraw %}

ثم استخدم في أي مكان:

{% raw %}```python
from src.settings import settings

def GET():
    return {"db": settings.database_url}
```{% endraw %}

## متغيرات البيئة في NexyConfig

استخدم `os.getenv` لتمرير env vars إلى [Nexy config](/docs/config/nexy):

{% raw %}```python
import os

class NexyConfig(NexyConfigModel):
    usePort = int(os.getenv("PORT", "3000"))
    useTitle = os.getenv("SITE_TITLE", "My App")
```{% endraw %}

## أفضل ممارسات الإنتاج

- لا تلتزم مطلقًا بـ `.env` إلى git — أضف إلى `.gitignore`
- استخدم المدير السري لموفر الخدمة السحابية أو أسرار CI/CD للإنتاج
- أضف البادئة إلى env vars (على سبيل المثال، `NEXY_`، `APP_`) لتجنب الاصطدامات
- استخدم `pydantic-settings` للتحقق من الصحة واكتب الإكراه