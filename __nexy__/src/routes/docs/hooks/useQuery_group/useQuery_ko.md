# 사용쿼리

현재 URL에서 동적 경로 매개변수(경로 매개변수)를 반환합니다.

{% raw %}```python
from nexy import useQuery

query = useQuery()
```{% endraw %}

---

## 반환 값

`dict` — URL에서 추출된 경로 매개변수입니다(예: `[slug]` 경로의 경우 `{"slug": "hello-world"}`).

---

## 예

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<h1>Article: {{ params.slug }}</h1>
```{% endraw %}

---

## 여러 매개변수 사용

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<article>
    {{ params.title }}
    <p>Year: {{ params.year }}, Month: {{ params.month }}</p>
</article>
```{% endraw %}

---

## 사용 참고사항

- 값은 기본적으로 문자열입니다. FastAPI 유형 변환은 `.py` 핸들러에 적용됩니다.
- FastAPI의 `request.path_params`와 동일