#i18n

Configure localidades em `nexyconfig.py`:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useLocales = ["en", "fr", "ar", "es", "hi", "zh"]
    useDefaultLocale = "en"
```{% endraw %}

## Arquivos de tradução

Coloque os arquivos de tradução JSON em `nexy/i18n/<locale>/`:

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

Consulte [Config / i18n](/docs/config/i18n) para obter a referência completa.

## Usando traduções em modelos

{% raw %}```nexy
---
---
{{ trans("home.hero", "Build faster with Nexy") }}
{{ t("nav.docs", "Docs") }}
```{% endraw %}

- `trans(key, default)` — função completa
- `t(key, default)` — alias abreviado

## Detecção de localidade

Nexy detecta a localidade do usuário em (em ordem):

1. **Prefixo de URL**: `/fr/docs/`, `/en/docs/`
2. **Biscoito**: `nexy-locale`
3. **Cabeçalho Accept-Language**: preferência do navegador

A localidade detectada é definida como ContextVar com escopo de solicitação, acessível via `current_locale` ou `useLocale()`.

## Suporte RTL

Árabe (`ar`) e outros idiomas RTL são detectados automaticamente. Use `useLocale()` para verificar:

{% raw %}```nexy
---
from nexy import useLocale
locale = useLocale()
---
<html lang="{{locale.locale}}" dir="{{ 'rtl' if locale.is_rtl else 'ltr' }}">
```{% endraw %}

## Referência de configuração

| Opção | Tipo | Padrão | Descrição |
|--------|------|---------|-------------|
| `useLocales` | `list[str]` | `None` | Locais disponíveis |
| `useDefaultLocale` | `str` | `"en"` | Local alternativo |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | Nome do cookie de localidade |
| `useRTL` | `bool` | `False` | Habilitar layout RTL |