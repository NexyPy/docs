#आई18एन

अंतर्राष्ट्रीयकरण कॉन्फ़िगर करें - स्थानीय पहचान, अनुवाद फ़ाइलें और आरटीएल समर्थन।

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

## फ़ील्ड्स

| फ़ील्ड | प्रकार | डिफ़ॉल्ट | विवरण |
|-------|------|------|----|
| `useLocales` | `list[str] \| None` | `None` | उपलब्ध स्थान. यदि `None` है तो `nexy/i18n/` से स्वतः पता लगाया जाता है। |
| `useDefaultLocale` | `str` | `"en"` | पता लगाने में विफल होने पर फ़ॉलबैक लोकेल। |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | उपयोगकर्ता की स्थानीय पसंद को बनाए रखने के लिए कुकी नाम। |
| `useLocaleDetection` | `dict \| None` | `None` | पता लगाने की रणनीतियाँ: `header`, `cookie`, `path`। |
| `useRTL` | `bool` | `False` | दाएँ-से-बाएँ लेआउट समर्थन सक्षम करें। |

---

## अनुवाद फ़ाइलें

JSON अनुवाद फ़ाइलों को `nexy/i18n/<locale>/` में रखें:

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

## टेम्पलेट्स में उपयोग

{% raw %}```nexy
---
from nexy.i18n import t
welcome = t("welcome")
---
{{ welcome }}
```{% endraw %}

---

## पायथन में उपयोग

{% raw %}```python
from nexy.i18n import trans, t

msg = trans("welcome")            # explicit
msg = t("welcome")                # shorthand
msg = t("missing_key", default="Fallback")
```{% endraw %}

---

## लोकेल स्विचिंग

{% raw %}```python
from nexy.i18n import useLocale
locale = useLocale()
print(locale["locale"])       # "fr"
print(locale["is_rtl"])       # False
print(locale["available"])    # ["en", "fr", "es"]
```{% endraw %}

---

## आरटीएल समर्थन

जब `useRTL = True`, Nexy `<html>` तत्व पर `dir="rtl"` विशेषता सेट करता है और समर्थित फ़्रेमवर्क के लिए RTL-समायोजित स्टाइलशीट लोड करता है।