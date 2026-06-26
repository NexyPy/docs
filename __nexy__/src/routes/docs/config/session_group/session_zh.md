# 会话

为签名 cookie 会话配置会话中间件 — 无需服务器端存储。

{% raw %}```python
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useSession = {
        "secret_key": "your-secret-key",
        "max_age": 3600,
        "same_site": "lax",
        "https_only": False,
    }
```{% endraw %}

在幕后使用 Starlette 的`SessionMiddleware`。

---

## 字段

|领域 |类型 |默认 |描述 |
|--------|------|---------|-------------|
| `secret_key` | `str` |必填|用于签署会话 cookie 的密钥 |
| `max_age` | `int` | `1209600`（14 天）|会话 cookie 最大期限（以秒为单位）|
| `same_site` | `str` | `"lax"` | SameSite 策略（`"lax"`、`"strict"`、`"none"`）|
| `https_only` | `bool` | `False` |仅通过 HTTPS 发送 cookie |

 - -

＃＃ 用法

{% raw %}```python
from nexy import useSession

session = useSession()
session["user_id"] = 123
session["role"] = "admin"
```{% endraw %}

Session 的行为就像一本字典——分配、读取、删除：

{% raw %}```python
session = useSession()
user_id = session.get("user_id")
del session["user_id"]
```{% endraw %}

---

## Flash 消息模式

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append({"type": "success", "text": "Saved!"})
session["_flashes"] = flashes
```{% endraw %}

然后在模板中阅读并清除：

{% raw %}```python
session = useSession()
flashes = session.pop("_flashes", [])
```{% endraw %}

---

## 安全说明

- 会话数据已签名但**未加密** - 不存储敏感数据
- 在生产中定期轮换`secret_key`
- 在生产中使用`https_only=True`