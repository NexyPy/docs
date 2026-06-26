# i18n

Konfigurieren Sie die Internationalisierung – Gebietsschemaerkennung, Übersetzungsdateien und RTL-Unterstützung.

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

## Felder

| Feld | Geben Sie | ein Standard | Beschreibung |
|-------|------|---------|-------------|
| `useLocales` | `list[str] \| None` | `None` | Verfügbare Orte. Wird ab `nexy/i18n/` automatisch erkannt, wenn `None`. |
| `useDefaultLocale` | `str` | `"en"` | Fallback-Gebietsschema, wenn die Erkennung fehlschlägt. |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | Cookie-Name zum Beibehalten der Gebietsschemaauswahl des Benutzers. |
| `useLocaleDetection` | `dict \| None` | `None` | Erkennungsstrategien: `header`, `cookie`, `path`. |
| `useRTL` | `bool` | `False` | Aktivieren Sie die Unterstützung für das Layout von rechts nach links. |

---

## Übersetzungsdateien

Platzieren Sie JSON-Übersetzungsdateien in `nexy/i18n/<locale>/`:

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

## Verwendung in Vorlagen

{% raw %}```nexy
---
from nexy.i18n import t
welcome = t("welcome")
---
{{ welcome }}
```{% endraw %}

---

## Verwendung in Python

{% raw %}```python
from nexy.i18n import trans, t

msg = trans("welcome")            # explicit
msg = t("welcome")                # shorthand
msg = t("missing_key", default="Fallback")
```{% endraw %}

---

## Gebietsschemawechsel

{% raw %}```python
from nexy.i18n import useLocale
locale = useLocale()
print(locale["locale"])       # "fr"
print(locale["is_rtl"])       # False
print(locale["available"])    # ["en", "fr", "es"]
```{% endraw %}

---

## RTL-Unterstützung

Bei `useRTL = True` setzt Nexy das Attribut `dir="rtl"` auf das Element `<html>` und lädt RTL-angepasste Stylesheets für unterstützte Frameworks.