# useQuery

現在の URL から動的ルート パラメータ (パス パラメータ) を返します。

{% raw %}```python
from nexy import useQuery

query = useQuery()
```{% endraw %}

---

## 戻り値

`dict` — URL から抽出されたパス パラメータ (例: `[slug]` ルートの場合は `{"slug": "hello-world"}`)。

 - -

＃＃ 例

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<h1>Article: {{ params.slug }}</h1>
```{% endraw %}

---

## 複数のパラメータを使用する場合

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

## 使用上の注意

- デフォルトでは値は文字列です - FastAPI タイプ変換は `.py` ハンドラーに適用されます
- FastAPI の `request.path_params` に相当