#i18n

`nexyconfig.py` でロケールを構成します。

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useLocales = ["en", "fr", "ar", "es", "hi", "zh"]
    useDefaultLocale = "en"
```{% endraw %}

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
  "nav.docs": "Documentation",
  "nav.blog": "Blog",
  "home.hero": "Build faster with Nexy"
}
```{% endraw %}

完全なリファレンスについては、[Config / i18n](/docs/config/i18n) を参照してください。

## テンプレートでの翻訳の使用

{% raw %}```nexy
---
---
{{ trans("home.hero", "Build faster with Nexy") }}
{{ t("nav.docs", "Docs") }}
```{% endraw %}

- `trans(key, default)` — 全機能
- `t(key, default)` — 短縮エイリアス

## ロケールの検出

Nexy はユーザーのロケールを (順番に) 検出します。

1. **URL プレフィックス**: `/fr/docs/`、`/en/docs/`
2. **クッキー**: `nexy-locale`
3. **Accept-Language ヘッダー**: ブラウザの設定

検出されたロケールは、`current_locale` または `useLocale()` 経由でアクセスできる、リクエスト スコープの ContextVar として設定されます。

## RTL サポート

アラビア語 (`ar`) およびその他の RTL 言語は自動的に検出されます。 `useLocale()` を使用して次を確認します。

{% raw %}```nexy
---
from nexy import useLocale
locale = useLocale()
---
<html lang="{{locale.locale}}" dir="{{ 'rtl' if locale.is_rtl else 'ltr' }}">
```{% endraw %}

## 構成リファレンス

|オプション |タイプ |デフォルト |説明 |
|----------|------|----------|---------------|
| `useLocales` | `list[str]` | `None` |利用可能なロケール |
| `useDefaultLocale` | `str` | `"en"` |フォールバック ロケール |
| `useLocaleCookieName` | `str` | `"nexy-locale"` |ロケール Cookie 名 |
| `useRTL` | `bool` | `False` | RTL レイアウトを有効にする |