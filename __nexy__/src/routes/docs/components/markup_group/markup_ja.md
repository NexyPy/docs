# Nexy でマークアップを書く

Nexy テンプレートは、動的コンテンツに **HTML** + **Jinja2** を使用します。
HTML と Jinja2 を知っている場合は、Nexy テンプレートをすでに知っているでしょう。

---

## テキスト補間
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
変数はフロントマターまたはプロップから取得されます。

---

## フィルター

Jinja2 フィルターは値を変換します。
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe` は、文字列を安全な HTML (自動エスケープなし) としてマークします。

---

## for ループ
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## もし/そうでなければ
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## テンプレート内のコンポーネント

コンポーネントは HTML 要素のように使用されます。
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
`Slot` コンポーネントは子をレンダリングします (「モジュール」を参照)。

---

## 生の JS ブロック

`{{ '{{' }} '' {{ '}}' }}` を使用して、`{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` を Jinja2 解析から保護します (JS フレームワークを埋め込むときに必要です)。
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}