#神社2

Nexy は、テンプレート エンジンとして **Jinja2** を使用しています。すべての `.nexy` ファイルのテンプレート ブロックは、Jinja2 テンプレートとしてレンダリングされます。

---

## 構文

{% raw %}```nexy
---
title = "Hello"
items = [1, 2, 3]
---
{{ title }}
<ul>
{% for item in items %}
    {{ item }}
{% endfor %}
</ul>
{% if user %}
    <p>Welcome, {{ user.name }}</p>
{% endif %}
```{% endraw %}

---

## テンプレートのコンテキスト

テンプレート コンテキストには次のものが含まれます。

- フロントマターで宣言されたすべてのプロパティ (`item: prop[type]`)
- 自動挿入ヘルパー: `Slot`、`trans`、`t`、`__current_locale`、`__Import`、`__Template`
- 追加の小道具: `caller`、`children`

---

## フィルター

すべての Jinja2 組み込みフィルタが利用可能です。

{% raw %}```nexy
{{ description | truncate(100) }}
{{ created_at | date(format="short") }}
{{ content | safe }}
{{ name | title }}
```{% endraw %}

---

## マクロ

Jinja2 マクロは `.nexy` ファイルで動作します。

{% raw %}```nexy
{% macro input(name, type="text", value="") %}
    <input type="{{ type }}" name="{{ name }}" value="{{ value }}" />
{% endmacro %}

<form>
    {{ input("username") }}
    {{ input("password", type="password") }}
</form>
```{% endraw %}

---

## マークダウン

`.mdx` ファイルはマークダウンとしてレンダリングされ、レイアウト テンプレートにラップされます。標準の Jinja2 構文は `.mdx` 内でも機能します。

---

## 空白コントロール

Jinja2 の空白コントロールは `.nexy` ファイルで機能します。

{% raw %}```nexy
{%- for item in items -%}
    {{ item }}
{%- endfor -%}
```{% endraw %}

`{{ '{%' }}-` および `-{{ '%}' }}` を使用して、制御ブロックの周囲の空白を削除します。