# сессия

Настройте промежуточное программное обеспечение сеанса для сеансов с подписанными файлами cookie — хранилище на стороне сервера не требуется.

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

Под капотом используется `SessionMiddleware` от Starlette.

---

## Поля

| Поле | Тип | По умолчанию | Описание |
|-------|------|---------|-------------|
| `secret_key` | `str` | требуется | Секретный ключ для подписи сеансовых файлов cookie |
| `max_age` | `int` | `1209600` (14 дней) | Максимальный возраст файлов cookie сеанса в секундах |
| `same_site` | `str` | `"lax"` | Политика SameSite (`"lax"`, `"strict"`, `"none"`) |
| `https_only` | `bool` | `False` | Отправлять файлы cookie только через HTTPS |

---

## Использование

{% raw %}```python
from nexy import useSession

session = useSession()
session["user_id"] = 123
session["role"] = "admin"
```{% endraw %}

Сессия ведет себя как словарь — назначать, читать, удалять:

{% raw %}```python
session = useSession()
user_id = session.get("user_id")
del session["user_id"]
```{% endraw %}

---

## Шаблон флэш-сообщений

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append({"type": "success", "text": "Saved!"})
session["_flashes"] = flashes
```{% endraw %}

Затем прочитайте и очистите свой шаблон:

{% raw %}```python
session = useSession()
flashes = session.pop("_flashes", [])
```{% endraw %}

---

## Примечания по безопасности

– Данные сеанса подписаны, но **не зашифрованы** — не храните конфиденциальные данные.
- Периодическая ротация `secret_key` в производстве
- Используйте `https_only=True` в производстве