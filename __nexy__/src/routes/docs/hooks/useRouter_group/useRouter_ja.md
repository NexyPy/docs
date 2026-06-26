# useRouter

現在のリクエストのルーティング コンテキストを含むオブジェクトを返します。

{% raw %}```python
from nexy import useRouter

router = useRouter()
```{% endraw %}

---

## 戻り値

`dict` と次のキー:

|キー |タイプ |説明 |
|-----|------|---------------|
| `path` | `str` |現在の URL パス |
| `base_url` | `str` |サーバーのベース URL |
| `url_for` | `callable \| None` | FastAPI の `url_for` 関数による URL 逆引き検索 |

 - -

＃＃ 例

{% raw %}```nexy
---
from nexy import useRouter
router = useRouter()
---
<p>Current path: {{ router.path }}</p>
<p>Base URL: {{ router.base_url }}</p>
```{% endraw %}

---

## URL 逆引きルックアップ

{% raw %}```python
router = useRouter()
if router.url_for:
    url = router.url_for("read_article", slug="hello-world")
```{% endraw %}

---

## 使用上の注意

- `url_for` はリクエスト コンテキスト外では `None` である可能性があります
- 内部で FastAPI の `request.app.url_for` を使用します