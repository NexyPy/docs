# Environment & Settings

Manage configuration with environment variables and `.env` files.

## `.env` files

Nexy reads `.env` files automatically at startup (via `python-dotenv`).

{% raw %}```env
# .env
DATABASE_URL=postgresql://localhost/mydb
SECRET_KEY=change-me-in-production
DEBUG=true
```{% endraw %}

Access them via `os.environ`:

{% raw %}```python
import os

DATABASE_URL = os.environ["DATABASE_URL"]
```{% endraw %}

## Pydantic Settings

For typed settings with validation:

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

Then use anywhere:

{% raw %}```python
from src.settings import settings

def GET():
    return {"db": settings.database_url}
```{% endraw %}

## Environment variables in NexyConfig

Use `os.getenv` to pass env vars into your [Nexy config](/docs/config/nexy):

{% raw %}```python
import os

class NexyConfig(NexyConfigModel):
    usePort = int(os.getenv("PORT", "3000"))
    useTitle = os.getenv("SITE_TITLE", "My App")
```{% endraw %}

## Production best practices

- Never commit `.env` to git — add to `.gitignore`
- Use your cloud provider's secret manager or CI/CD secrets for production
- Prefix your env vars (e.g., `NEXY_`, `APP_`) to avoid collisions
- Use `pydantic-settings` for validation and type coercion