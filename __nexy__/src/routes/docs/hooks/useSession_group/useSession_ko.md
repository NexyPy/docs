# useSession

현재 요청에 대한 세션 사전을 반환합니다. 세션은 서명된 쿠키로 지원되며 서버측 저장소는 없습니다.

{% raw %}```python
from nexy import useSession

session = useSession()
```{% endraw %}

---

## 반환 값

`dict` — 서명된 쿠키의 세션 데이터입니다. 세션이 없으면 빈 사전을 반환합니다.

---

## 예

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
user_id = session.get("user_id")
---
{% if user_id %}
    <p>Logged in as user {{ user_id }}</p>
{% else %}
    <p>Guest</p>
{% endif %}
```{% endraw %}

---

## 세션 데이터 쓰기

{% raw %}```python
session = useSession()
session["user_id"] = 123
session["role"] = "admin"
del session["_flash"]
```{% endraw %}

---

## 플래시 메시지 패턴

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append("Item saved!")
session["_flashes"] = flashes
```{% endraw %}

---

## 사용 참고사항

- `nexyconfig.py`에 `useSession` 구성이 필요합니다.
- 세션 데이터가 서명되었지만 **암호화되지 않음**
- 서버 측 저장소가 없습니다. 모든 것이 쿠키에 있습니다.