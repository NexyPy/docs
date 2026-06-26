# Nexy로 마크업 작성

Nexy 템플릿은 동적 콘텐츠에 **HTML** + **Jinja2**를 사용합니다.
HTML과 Jinja2를 알고 있다면 이미 Nexy 템플릿을 알고 있을 것입니다.

---

## 텍스트 보간
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
변수는 머리말이나 소품에서 나옵니다.

---

## 필터

Jinja2 필터는 값을 변환합니다.
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe`는 문자열을 안전한 HTML(자동 이스케이프 없음)로 표시합니다.

---

## For 루프
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## 만약/그렇지 않다면
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## 템플릿의 구성요소

구성 요소는 HTML 요소처럼 사용됩니다.
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
`Slot` 구성 요소는 하위 항목을 렌더링합니다(모듈 참조).

---

## 원시 JS 블록

`{{ '{{' }} '' {{ '}}' }}`를 사용하여 Jinja2 구문 분석으로부터 `{{ '{{' }} '{{ '{{' }}' {{ '}}' }}`를 보호합니다(JS 프레임워크를 포함할 때 필요함).
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}