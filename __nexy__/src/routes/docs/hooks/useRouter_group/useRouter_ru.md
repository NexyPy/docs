# использоватьRouter

Возвращает объект с контекстом маршрутизации для текущего запроса.

{% raw %}```python
from nexy import useRouter

router = useRouter()
```{% endraw %}

---

## Возвращаемое значение

`dict` со следующими ключами:

| Ключ | Тип | Описание |
|-----|------|-------------|
| `path` | `str` | Текущий URL-путь |
| `base_url` | `str` | Базовый URL сервера |
| `url_for` | `callable \| None` | Функция `url_for` FastAPI для обратного поиска URL |

---

## Пример

{% raw %}```nexy
---
from nexy import useRouter
router = useRouter()
---
<p>Current path: {{ router.path }}</p>
<p>Base URL: {{ router.base_url }}</p>
```{% endraw %}

---

## Обратный поиск URL-адреса

{% raw %}```python
router = useRouter()
if router.url_for:
    url = router.url_for("read_article", slug="hello-world")
```{% endraw %}

---

## Примечания по использованию

- `url_for` может быть `None` вне контекста запроса.
- Использует `request.app.url_for` FastAPI под капотом.