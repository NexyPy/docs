# 国际化

在 `nexyconfig.py` 中配置区域设置：

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useLocales = ["en", "fr", "ar", "es", "hi", "zh"]
    useDefaultLocale = "en"
```{% endraw %}

## 翻译文件

将 JSON 翻译文件放入 `nexy/i18n/<locale>/` 中：

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

请参阅 [Config / i18n](/docs/config/i18n) 获取完整参考。

## 在模板中使用翻译

{% raw %}```nexy
---
---
{{ trans("home.hero", "Build faster with Nexy") }}
{{ t("nav.docs", "Docs") }}
```{% endraw %}

- `trans(key, default)` — 完整功能
- `t(key, default)` — 速记别名

## 区域设置检测

Nexy 从以下位置检测用户的区域设置（按顺序）：

1. **网址前缀**：`/fr/docs/`、`/en/docs/`
2. **Cookie**：`nexy-locale`
3. **Accept-Language header**：浏览器首选项

检测到的区域设置设置为请求范围的 ContextVar，可通过 `current_locale` 或 `useLocale()` 访问。

## RTL 支持

自动检测阿拉伯语 (`ar`) 和其他 RTL 语言。使用 `useLocale()` 检查：

{% raw %}```nexy
---
from nexy import useLocale
locale = useLocale()
---
<html lang="{{locale.locale}}" dir="{{ 'rtl' if locale.is_rtl else 'ltr' }}">
```{% endraw %}

## 配置参考

|选项 |类型 |默认 |描述 |
|--------|------|---------|-------------|
| `useLocales` | `list[str]` | `None` |可用区域设置 |
| `useDefaultLocale` | `str` | `"en"` |后备语言环境 |
| `useLocaleCookieName` | `str` | `"nexy-locale"` |区域设置 cookie 名称 |
| `useRTL` | `bool` | `False` |启用 RTL 布局 |