# i18n

Configure internationalization — locale detection, translation files, and RTL support.

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useLocales = ["en", "fr", "es"]
    useDefaultLocale = "en"
    useLocaleCookieName = "nexy-locale"
    useLocaleDetection = {"header": True, "cookie": True}
    useRTL = False
```{% endraw %}

---

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `useLocales` | `list[str] \| None` | `None` | Available locales. Auto-detected from `nexy/i18n/` if `None`. |
| `useDefaultLocale` | `str` | `"en"` | Fallback locale when detection fails. |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | Cookie name for persisting the user's locale choice. |
| `useLocaleDetection` | `dict \| None` | `None` | Detection strategies: `header`, `cookie`, `path`. |
| `useRTL` | `bool` | `False` | Enable right-to-left layout support. |

---

## Translation files

Place JSON translation files in `nexy/i18n/<locale>/`:

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
    "welcome": "Welcome",
    "greeting": "Hello!"
}
```{% endraw %}

{% raw %}```json
// nexy/i18n/fr/common.json
{
    "welcome": "Bienvenue",
    "greeting": "Bonjour !"
}
```{% endraw %}

---

## Usage in templates

{% raw %}```nexy
---
from nexy.i18n import t
welcome = t("welcome")
---
{{ welcome }}
```{% endraw %}

---

## Usage in Python

{% raw %}```python
from nexy.i18n import trans, t

msg = trans("welcome")            # explicit
msg = t("welcome")                # shorthand
msg = t("missing_key", default="Fallback")
```{% endraw %}

---

## Locale switching

{% raw %}```python
from nexy.i18n import useLocale
locale = useLocale()
print(locale["locale"])       # "fr"
print(locale["is_rtl"])       # False
print(locale["available"])    # ["en", "fr", "es"]
```{% endraw %}

---

## RTL support

When `useRTL = True`, Nexy sets the `dir="rtl"` attribute on the `<html>` element and loads RTL-adjusted stylesheets for supported frameworks.