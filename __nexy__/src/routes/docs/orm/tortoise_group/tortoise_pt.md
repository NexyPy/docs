# Tartaruga-ORM

**Tortoise-ORM** é um ORM nativo assíncrono inspirado no ORM do Django. Fácil de aprender, funciona bem com FastAPI/Nexy.

## Configuração

{% raw %}```python
TORTOISE_ORM = {
    "connections": {"default": "sqlite://dev.db"},
    "apps": {"models": {"models": ["models", "aerich.models"], "default_connection": "default"}},
}
```{% endraw %}

## Exemplo

{% raw %}```python
from tortoise import fields
from tortoise.models import Model

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=100)
```{% endraw %}

## Migrações

Tortoise-ORM usa **Aerich** (configurado via `nx migrate`):

{% raw %}```bash
nx migrate --init    # Initialize Aerich (first time)
nx migrate           # Create migration
nx migrate --upgrade # Apply
```{% endraw %}

Tortoise-ORM é uma ótima escolha se você vem do Django e deseja uma API familiar com suporte assíncrono.