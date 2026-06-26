リダイレクト数 (FBR)

FastAPI の `RedirectResponse` を使用して、受信リクエストを他の URL にリダイレクトします。

## 基本的なリダイレクト

{% raw %}```python
# src/routes/redirect.py
from fastapi.responses import RedirectResponse

def GET():
    return RedirectResponse("/login")
```{% endraw %}

## ステータスコードあり

{% raw %}```python
from fastapi.responses import RedirectResponse

def GET():
    return RedirectResponse("/new-page", status_code=301)
```{% endraw %}

## 条件付きリダイレクト

{% raw %}```python
from fastapi.responses import RedirectResponse

def GET(request):
    if not request.user.is_authenticated:
        return RedirectResponse("/login")
    return "<h1>Dashboard</h1>"
```{% endraw %}

## ステータスコードのリファレンス

|コード |名前 |使用例 |
|------|------|----------|
| 301 |永久に移動されました | URL の永続的な変更 |
| 302 |見つかりました (デフォルト) |一時的なリダイレクト |
| 307 |一時的なリダイレクト | HTTP メソッドを保持します |
| 308 |永続的なリダイレクト | HTTP メソッドを保持します |

## よくあるパターン

- 認証リダイレクト: 認証されていないユーザー → `/login`
- レガシー URL: 古いパス → 新しいパス (301)
- 送信後のリダイレクト: フォーム POST 後 → 成功ページ (303)
- ロケール リダイレクト: ブラウザ言語に基づく `/` → `/{locale}/`