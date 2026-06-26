# использовать сеанс

Возвращает словарь сеанса для текущего запроса. Сеансы поддерживаются подписанными файлами cookie — никакого хранилища на стороне сервера.

{% raw %}```python
from nexy import useSession

session = useSession()
```{% endraw %}

---

## Возвращаемое значение

`dict` — данные сеанса из подписанного файла cookie. Возвращает пустой словарь, если сеанса не существует.

---

## Пример

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
user_id = session.get("user_id")
---
{% if user_id %}
    <p>Logged in as user {{ user_id }}</p>
{% else %}
    <p>Guest</p>
{% endif %}
```{% endraw %}

---

## Запись данных сеанса

{% raw %}```python
session = useSession()
session["user_id"] = 123
session["role"] = "admin"
del session["_flash"]
```{% endraw %}

---

## Шаблон флэш-сообщений

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append("Item saved!")
session["_flashes"] = flashes
```{% endraw %}

---

## Примечания по использованию

- Требуется конфигурация `useSession` в `nexyconfig.py`
- Данные сеанса подписаны, но **не зашифрованы**.
- Нет хранилища на стороне сервера — все находится в cookie