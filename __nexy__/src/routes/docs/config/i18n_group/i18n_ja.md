#i18n

国際化の構成 — ロケール検出、翻訳ファイル、および RTL サポート。

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

## フィールド

|フィールド |タイプ |デフォルト |説明 |
|----------|------|----------|---------------|
| `useLocales` | `list[str] \| None` | `None` |利用可能なロケール。 `None` の場合は `nexy/i18n/` から自動検出されます。 |
| `useDefaultLocale` | `str` | `"en"` |検出が失敗した場合のフォールバック ロケール。 |
| `useLocaleCookieName` | `str` | `"nexy-locale"` |ユーザーのロケール選択を保持するための Cookie 名。 |
| `useLocaleDetection` | `dict \| None` | `None` |検出戦略: `header`、`cookie`、`path`。 |
| `useRTL` | `bool` | `False` |右から左へのレイアウトのサポートを有効にします。 |

---

## 翻訳ファイル

JSON 翻訳ファイルを `nexy/i18n/<locale>/` に配置します。

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

## テンプレートでの使用法

{% raw %}```nexy
---
from nexy.i18n import t
welcome = t("welcome")
---
{{ welcome }}
```{% endraw %}

---

## Python での使用法

{% raw %}```python
from nexy.i18n import trans, t

msg = trans("welcome")            # explicit
msg = t("welcome")                # shorthand
msg = t("missing_key", default="Fallback")
```{% endraw %}

---

## ロケールの切り替え

{% raw %}```python
from nexy.i18n import useLocale
locale = useLocale()
print(locale["locale"])       # "fr"
print(locale["is_rtl"])       # False
print(locale["available"])    # ["en", "fr", "es"]
```{% endraw %}

---

## RTL サポート

`useRTL = True` の場合、Nexy は `<html>` 要素に `dir="rtl"` 属性を設定し、サポートされているフレームワークの RTL 調整されたスタイルシートをロードします。