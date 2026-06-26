#i18n

Configure a internacionalização — detecção de localidade, arquivos de tradução e suporte RTL.

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

| Campo | Tipo | Padrão | Descrição |
|-------|------|---------|------------|
| `useLocales` | `list[str] \| None` | `None` | Locais disponíveis. Detectado automaticamente de `nexy/i18n/` se `None`. |
| `useDefaultLocale` | `str` | `"en"` | Local alternativo quando a detecção falha. |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | Nome do cookie para persistir a escolha de localidade do usuário. |
| `useLocaleDetection` | `dict \| None` | `None` | Estratégias de detecção: `header`, `cookie`, `path`. |
| `useRTL` | `bool` | `False` | Ative o suporte ao layout da direita para a esquerda. |

---

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

## Uso em modelos

{% raw %}```nexy
---
from nexy.i18n import t
welcome = t("welcome")
---
{{ welcome }}
```{% endraw %}

---

## Uso em Python

{% raw %}```python
from nexy.i18n import trans, t

msg = trans("welcome")            # explicit
msg = t("welcome")                # shorthand
msg = t("missing_key", default="Fallback")
```{% endraw %}

---

## Troca de localidade

{% raw %}```python
from nexy.i18n import useLocale
locale = useLocale()
print(locale["locale"])       # "fr"
print(locale["is_rtl"])       # False
print(locale["available"])    # ["en", "fr", "es"]
```{% endraw %}

---

## Suporte RTL

Quando `useRTL = True`, Nexy define o atributo `dir="rtl"` no elemento `<html>` e carrega folhas de estilo ajustadas em RTL para estruturas suportadas.