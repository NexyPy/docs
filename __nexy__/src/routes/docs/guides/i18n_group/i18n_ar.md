#i18n

تكوين اللغات في `nexyconfig.py`:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useLocales = ["en", "fr", "ar", "es", "hi", "zh"]
    useDefaultLocale = "en"
```{% endraw %}

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
  "nav.docs": "Documentation",
  "nav.blog": "Blog",
  "home.hero": "Build faster with Nexy"
}
```{% endraw %}

راجع [Config / i18n](/docs/config/i18n) للحصول على المرجع الكامل.

## استخدام الترجمات في القوالب

{% raw %}```nexy
---
---
{{ trans("home.hero", "Build faster with Nexy") }}
{{ t("nav.docs", "Docs") }}
```{% endraw %}

- `trans(key, default)` — وظيفة كاملة
- `t(key, default)` — اسم مستعار مختصر

## الكشف عن اللغة

يكتشف Nexy لغة المستخدم من (بالترتيب):

1. **بادئة عنوان URL**: `/fr/docs/`، `/en/docs/`
2. **ملف تعريف الارتباط**: `nexy-locale`
3. **عنوان قبول اللغة**: تفضيلات المتصفح

يتم تعيين اللغة المكتشفة باعتبارها contextVar على نطاق الطلب، ويمكن الوصول إليها عبر `current_locale` أو `useLocale()`.

## دعم RTL

يتم اكتشاف اللغة العربية (`ar`) ولغات RTL الأخرى تلقائيًا. استخدم `useLocale()` للتحقق:

{% raw %}```nexy
---
from nexy import useLocale
locale = useLocale()
---
<html lang="{{locale.locale}}" dir="{{ 'rtl' if locale.is_rtl else 'ltr' }}">
```{% endraw %}

## مرجع التكوين

| الخيار | اكتب | الافتراضي | الوصف |
|--------|------|---------|-------------|
| `useLocales` | `list[str]` | `None` | اللغات المتاحة |
| `useDefaultLocale` | `str` | `"en"` | لغة احتياطية |
| `useLocaleCookieName` | `str` | `"nexy-locale"` | اسم ملف تعريف الارتباط المحلي |
| `useRTL` | `bool` | `False` | تمكين تخطيط RTL |