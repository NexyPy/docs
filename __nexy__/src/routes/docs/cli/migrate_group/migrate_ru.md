# nx миграция

Управляет миграцией базы данных с помощью настроенного инструмента миграции ORM.

{% raw %}```bash
nx migrate
```{% endraw %}

---

## Как это работает

Nexy обнаруживает настроенный ORM из `nexyconfig.py` и делегирует его соответствующему инструменту:

| ОРМ | Инструмент миграции | Поле конфигурации |
|-----|---------------|--------------|
| SQLАлхимия | Перегонный куб | `useORM` |
| SQLМодель | Перегонный куб | `useORM` |
| Черепаха-ОРМ | Айрих | `useORM` |

---

## Команды

| Команда | Описание |
|---------|-------------|
| `nx migrate` | Создать новую миграцию (автоматическое обнаружение изменений) |
| `nx migrate --init` | Инструмент инициализации миграции (Alembic/Aerich) |
| `nx migrate --upgrade` / `-u` | Применить ожидающие миграции |
| `nx migrate -m "message"` | Создать миграцию с сообщением |

---

## Пример

{% raw %}```bash
# Initialize Alembic (first time)
nx migrate --init

# Create a migration after model changes
nx migrate -m "add user table"

# Apply to database
nx migrate --upgrade
```{% endraw %}

---

## Псевдоним

`nx m`