#i18n

Configurar configuraciones regionales en `nexyconfig.py`:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useLocales = ["en", "fr", "ar", "es", "hi", "zh"]
    useDefaultLocale = "en"
```{% endraw %}

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
  "nav.docs": "Documentation",
  "nav.blog": "Blog",
  "home.hero": "Build faster with Nexy"
}
```{% endraw %}

Consulte [Config / i18n](/docs/config/i18n) para obtener la referencia completa.

## Uso de traducciones en plantillas

{% raw %}```nexy
---
---
{{ trans("home.hero", "Build faster with Nexy") }}
{{ t("nav.docs", "Docs") }}
```{% endraw %}

- `trans(key, default)` — función completa
- `t(key, default)` — alias abreviado

## Detección local

Nexy detecta la configuración regional del usuario (en orden):

1. **Prefijo de URL**: `/fr/docs/`, `/en/docs/`
2. **Cookie**: `nexy-locale`
3. **Encabezado Aceptar-Idioma**: preferencia del navegador

La configuración regional detectada se establece como una ContextVar con alcance de solicitud, accesible a través de `current_locale` o `useLocale()`.

## Soporte RTL

El árabe (`ar`) y otros idiomas RTL se detectan automáticamente. Utilice `useLocale()` para comprobar:

{% raw %}```nexy
---
from nexy import useLocale
locale = useLocale()
---
<html lang="{{locale.locale}}" dir="{{ 'rtl' if locale.is_rtl else 'ltr' }}">
```{% endraw %}

## Referencia de configuración

| Opción | Tipo | Predeterminado | Descripción |
|--------|------|---------|-------------|
| `useLocales` | `list[str]` | `None` | Locales disponibles |
| `useDefaultLocale` | `str` | `"en"` | Configuración regional alternativa |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | Nombre de la cookie local |
| `useRTL` | `bool` | `False` | Habilitar diseño RTL |