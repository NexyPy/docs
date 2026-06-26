# 使用会话

返回当前请求的会话字典。会话由签名的 cookie 支持——没有服务器端存储。

{% raw %}```python
from nexy import useSession

session = useSession()
```{% endraw %}

---

## 返回值

`dict` — 来自签名 cookie 的会话数据。如果不存在会话，则返回空字典。

 - -

＃＃ 例子

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

## 写入会话数据

{% raw %}```python
session = useSession()
session["user_id"] = 123
session["role"] = "admin"
del session["_flash"]
```{% endraw %}

---

## Flash 消息模式

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append("Item saved!")
session["_flashes"] = flashes
```{% endraw %}

---

## 使用说明

- 需要 `nexyconfig.py` 中的 `useSession` 配置
- 会话数据已签名但**未加密**
- 没有服务器端存储——一切都在cookie中