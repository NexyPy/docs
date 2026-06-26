# i18n

Konfigurieren Sie Gebietsschemas in `nexyconfig.py`:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useLocales = ["en", "fr", "ar", "es", "hi", "zh"]
    useDefaultLocale = "en"
```{% endraw %}

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
  "nav.docs": "Documentation",
  "nav.blog": "Blog",
  "home.hero": "Build faster with Nexy"
}
```{% endraw %}

Die vollständige Referenz finden Sie unter [Config / i18n](/docs/config/i18n).

## Übersetzungen in Vorlagen verwenden

{% raw %}```nexy
---
---
{{ trans("home.hero", "Build faster with Nexy") }}
{{ t("nav.docs", "Docs") }}
```{% endraw %}

- `trans(key, default)` – volle Funktion
- `t(key, default)` – Kurzschrift-Alias

## Lokalisierungserkennung

Nexy erkennt das Gebietsschema des Benutzers anhand (in der folgenden Reihenfolge):

1. **URL-Präfix**: `/fr/docs/`, `/en/docs/`
2. **Cookie**: `nexy-locale`
3. **Accept-Language-Header**: Browsereinstellung

Das erkannte Gebietsschema wird als anforderungsbezogene Kontextvariable festgelegt, auf die über `current_locale` oder `useLocale()` zugegriffen werden kann.

## RTL-Unterstützung

Arabisch (`ar`) und andere RTL-Sprachen werden automatisch erkannt. Verwenden Sie `useLocale()`, um Folgendes zu überprüfen:

{% raw %}```nexy
---
from nexy import useLocale
locale = useLocale()
---
<html lang="{{locale.locale}}" dir="{{ 'rtl' if locale.is_rtl else 'ltr' }}">
```{% endraw %}

## Konfigurationsreferenz

| Option | Geben Sie | ein Standard | Beschreibung |
|--------|------|---------|-------------|
| `useLocales` | `list[str]` | `None` | Verfügbare Gebietsschemas |
| `useDefaultLocale` | `str` | `"en"` | Fallback-Gebietsschema |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | Name des Gebietsschema-Cookies |
| `useRTL` | `bool` | `False` | RTL-Layout aktivieren |