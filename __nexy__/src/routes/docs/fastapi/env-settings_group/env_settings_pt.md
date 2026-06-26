# Ambiente e configurações

Gerencie a configuração com variáveis de ambiente e arquivos `.env`.

## `.env` arquivos

Nexy lê arquivos `.env` automaticamente na inicialização (via `python-dotenv`).

{% raw %}```env
# .env
DATABASE_URL=postgresql://localhost/mydb
SECRET_KEY=change-me-in-production
DEBUG=true
```{% endraw %}

Acesse-os via `os.environ`:

{% raw %}```python
import os

DATABASE_URL = os.environ["DATABASE_URL"]
```{% endraw %}

## Configurações Pydanticas

Para configurações digitadas com validação:

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

Então use em qualquer lugar:

{% raw %}```python
from src.settings import settings

def GET():
    return {"db": settings.database_url}
```{% endraw %}

## Variáveis de ambiente em NexyConfig

Use `os.getenv` para passar variáveis de ambiente para seu [Nexy config](/docs/config/nexy):

{% raw %}```python
import os

class NexyConfig(NexyConfigModel):
    usePort = int(os.getenv("PORT", "3000"))
    useTitle = os.getenv("SITE_TITLE", "My App")
```{% endraw %}

## Melhores práticas de produção

- Nunca comprometa `.env` com git — adicione a `.gitignore`
- Use o gerenciador de segredos do seu provedor de nuvem ou segredos de CI/CD para produção
- Prefixe seus env vars (por exemplo, `NEXY_`, `APP_`) para evitar colisões
- Use `pydantic-settings` para validação e coerção de tipo