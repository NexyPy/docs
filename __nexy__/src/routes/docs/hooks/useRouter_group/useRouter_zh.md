# 使用路由器

返回一个具有当前请求的路由上下文的对象。

{% raw %}```python
from nexy import useRouter

router = useRouter()
```{% endraw %}

---

## 返回值

`dict` 具有以下键：

|关键|类型 |描述 |
|-----|------|-------------|
| `path` | `str` |当前 URL 路径 |
| `base_url` | `str` |服务器的基本 URL |
| `url_for` | `callable \| None` | FastAPI 的 `url_for` 函数用于反向 URL 查找 |

 - -

＃＃ 例子

{% raw %}```nexy
---
from nexy import useRouter
router = useRouter()
---
<p>Current path: {{ router.path }}</p>
<p>Base URL: {{ router.base_url }}</p>
```{% endraw %}

---

## 反向URL查找

{% raw %}```python
router = useRouter()
if router.url_for:
    url = router.url_for("read_article", slug="hello-world")
```{% endraw %}

---

## 使用说明

- `url_for` 可能是请求上下文之外的 `None`
- 在底层使用 FastAPI 的 `request.app.url_for`