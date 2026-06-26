#i18n

تكوين التدويل - الكشف عن اللغة، وملفات الترجمة، ودعم RTL.

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

## الحقول

| المجال | اكتب | الافتراضي | الوصف |
|-------|------|---------|-------------|
| `useLocales` | `list[str] \| None` | `None` | اللغات المتاحة. تم اكتشافه تلقائيًا من `nexy/i18n/` إذا `None`. |
| `useDefaultLocale` | `str` | `"en"` | لغة احتياطية عند فشل الكشف. |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | اسم ملف تعريف الارتباط للاستمرار في اختيار لغة المستخدم. |
| `useLocaleDetection` | `dict \| None` | `None` | استراتيجيات الكشف: `header`، `cookie`، `path`. |
| `useRTL` | `bool` | `False` | تمكين دعم التخطيط من اليمين إلى اليسار. |

---

## ملفات الترجمة

ضع ملفات ترجمة JSON في `nexy/i18n/<locale>/`:

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

## الاستخدام في القوالب

{% raw %}```nexy
---
from nexy.i18n import t
welcome = t("welcome")
---
{{ welcome }}
```{% endraw %}

---

## الاستخدام في بايثون

{% raw %}```python
from nexy.i18n import trans, t

msg = trans("welcome")            # explicit
msg = t("welcome")                # shorthand
msg = t("missing_key", default="Fallback")
```{% endraw %}

---

## التبديل المحلي

{% raw %}```python
from nexy.i18n import useLocale
locale = useLocale()
print(locale["locale"])       # "fr"
print(locale["is_rtl"])       # False
print(locale["available"])    # ["en", "fr", "es"]
```{% endraw %}

---

## دعم RTL

عندما `useRTL = True`، يقوم Nexy بتعيين السمة `dir="rtl"` على العنصر `<html>` ويقوم بتحميل أوراق الأنماط المعدلة بواسطة RTL للأطر المدعومة.