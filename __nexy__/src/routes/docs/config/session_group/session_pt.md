# Sessão

Configure o middleware de sessão para sessões de cookies assinados — não é necessário armazenamento no servidor.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useSession = {
        "secret_key": "your-secret-key",
        "max_age": 3600,
        "same_site": "lax",
        "https_only": False,
    }
```{% endraw %}

Usa `SessionMiddleware` da Starlette sob o capô.

---

## Campos

| Campo | Tipo | Padrão | Descrição |
|-------|------|---------|------------|
| `secret_key` | `str` | obrigatório | Chave secreta para assinatura de cookies de sessão |
| `max_age` | `int` | `1209600` (14 dias) | Idade máxima do cookie de sessão em segundos |
| `same_site` | `str` | `"lax"` | Política SameSite (`"lax"`, `"strict"`, `"none"`) |
| `https_only` | `bool` | `False` | Enviar cookie apenas por HTTPS |

---

## Uso

{% raw %}```python
from nexy import useSession

session = useSession()
session["user_id"] = 123
session["role"] = "admin"
```{% endraw %}

A sessão se comporta como um dicionário – atribuir, ler, excluir:

{% raw %}```python
session = useSession()
user_id = session.get("user_id")
del session["user_id"]
```{% endraw %}

---

## Padrão de mensagens Flash

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append({"type": "success", "text": "Saved!"})
session["_flashes"] = flashes
```{% endraw %}

Em seguida, leia e limpe seu modelo:

{% raw %}```python
session = useSession()
flashes = session.pop("_flashes", [])
```{% endraw %}

---

## Notas de segurança

- Os dados da sessão são assinados, mas **não criptografados** — não armazene dados confidenciais
- Girar `secret_key` periodicamente na produção
- Use `https_only=True` na produção