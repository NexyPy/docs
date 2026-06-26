# 사용쿠키

현재 요청의 쿠키를 사전으로 반환합니다.

{% raw %}```python
from nexy import useCookies

cookies = useCookies()
```{% endraw %}

---

## 반환 값

`dict` — 요청과 함께 전송된 모든 쿠키.

---

## 예

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
locale = cookies.get("nexy-locale", "en")
---
<html lang="{{ locale }}">
```{% endraw %}

---

## 사용 참고사항

- 읽기 전용 — 쿠키 설정에 `useSession` 사용
- 쿠키 값은 문자열입니다.
- FastAPI의 `request.cookies`와 동일