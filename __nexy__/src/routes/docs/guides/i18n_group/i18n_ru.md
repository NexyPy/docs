# i18n

Настройте локали в `nexyconfig.py`:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useLocales = ["en", "fr", "ar", "es", "hi", "zh"]
    useDefaultLocale = "en"
```{% endraw %}

## Файлы перевода

Поместите файлы перевода JSON в `nexy/i18n/<locale>/`:

{% raw %}```text
nexy/
└── i18n/
    ├── en/
    │   └── common.json
    ├── fr/
    │   └── common.json
    └── es/
        └── common.json
```{% endraw %}

{% raw %}```json
// nexy/i18n/en/common.json
{
  "nav.docs": "Documentation",
  "nav.blog": "Blog",
  "home.hero": "Build faster with Nexy"
}
```{% endraw %}

Полную информацию см. в [Config / i18n](/docs/config/i18n).

## Использование переводов в шаблонах

{% raw %}```nexy
---
---
{{ trans("home.hero", "Build faster with Nexy") }}
{{ t("nav.docs", "Docs") }}
```{% endraw %}

- `trans(key, default)` — полная функция
- `t(key, default)` — сокращенный псевдоним

## Определение локали

Nexy определяет локаль пользователя по (по порядку):

1. **Префикс URL**: `/fr/docs/`, `/en/docs/`
2. **Файл cookie**: `nexy-locale`
3. **Заголовок Accept-Language**: настройки браузера.

Обнаруженная локаль задается как ContextVar области запроса, доступная через `current_locale` или `useLocale()`.

## Поддержка RTL

Арабский (`ar`) и другие языки с письмом справа налево определяются автоматически. Используйте `useLocale()`, чтобы проверить:

{% raw %}```nexy
---
from nexy import useLocale
locale = useLocale()
---
<html lang="{{locale.locale}}" dir="{{ 'rtl' if locale.is_rtl else 'ltr' }}">
```{% endraw %}

## Справочник по конфигурации

| Вариант | Тип | По умолчанию | Описание |
|--------|------|---------|-------------|
| `useLocales` | `list[str]` | `None` | Доступные локали |
| `useDefaultLocale` | `str` | `"en"` | Резервная локаль |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | Имя локального файла cookie |
| `useRTL` | `bool` | `False` | Включить макет RTL |