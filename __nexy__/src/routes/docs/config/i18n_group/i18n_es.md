#i18n

Configure la internacionalización: detección local, archivos de traducción y compatibilidad con RTL.

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

## Campos

| Campo | Tipo | Predeterminado | Descripción |
|-------|------|---------|-------------|
| `useLocales` | `list[str] \| None` | `None` | Locales disponibles. Detectado automáticamente desde `nexy/i18n/` si `None`. |
| `useDefaultLocale` | `str` | `"en"` | Configuración regional alternativa cuando falla la detección. |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | Nombre de la cookie para conservar la elección local del usuario. |
| `useLocaleDetection` | `dict \| None` | `None` | Estrategias de detección: `header`, `cookie`, `path`. |
| `useRTL` | `bool` | `False` | Habilite la compatibilidad con el diseño de derecha a izquierda. |

---

## Archivos de traducción

Coloque los archivos de traducción JSON en `nexy/i18n/<locale>/`:

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

## Uso en plantillas

{% raw %}```nexy
---
from nexy.i18n import t
welcome = t("welcome")
---
{{ welcome }}
```{% endraw %}

---

## Uso en Python

{% raw %}```python
from nexy.i18n import trans, t

msg = trans("welcome")            # explicit
msg = t("welcome")                # shorthand
msg = t("missing_key", default="Fallback")
```{% endraw %}

---

## Cambio de configuración regional

{% raw %}```python
from nexy.i18n import useLocale
locale = useLocale()
print(locale["locale"])       # "fr"
print(locale["is_rtl"])       # False
print(locale["available"])    # ["en", "fr", "es"]
```{% endraw %}

---

## Soporte RTL

Cuando `useRTL = True`, Nexy establece el atributo `dir="rtl"` en el elemento `<html>` y carga hojas de estilo ajustadas a RTL para los marcos compatibles.