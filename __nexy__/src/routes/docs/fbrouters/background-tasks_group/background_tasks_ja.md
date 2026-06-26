# バックグラウンドタスク (FBR)

応答の送信*後*、ロギング、通知、キャッシュウォーミングのためにコードを実行します。

{% raw %}```python
from fastapi import BackgroundTasks
```{% endraw %}

## 単一タスク

{% raw %}```python
# src/routes/log.py
from fastapi import BackgroundTasks

def write_log(message: str):
    with open("app.log", "a") as f:
        f.write(message + "\n")

def GET(tasks: BackgroundTasks):
    tasks.add_task(write_log, "Page visited")
    return {"status": "ok"}
```{% endraw %}

## 複数のタスク

{% raw %}```python
from fastapi import BackgroundTasks

def GET(tasks: BackgroundTasks):
    tasks.add_task(log_visit)
    tasks.add_task(notify_admin)
    tasks.add_task(warm_cache)
    return {"ok": True}
```{% endraw %}

## 依存関係のあるタスク

{% raw %}```python
from fastapi import BackgroundTasks, Depends
from src.db import get_db

def cleanup_old_records(db=Depends(get_db)):
    db.query(Log).delete()

def GET(tasks: BackgroundTasks):
    tasks.add_task(cleanup_old_records)
    return {"status": "cleaning"}
```{% endraw %}

## 重要

- タスクは応答の送信**後**に実行されます。クライアントは待機しません。
- 同じプロセスで実行されます - 長いタスクはイベント ループをブロックします
- 負荷の高い作業の場合は、タスクキュー (Celery、ARQ、RQ など) を使用します。
- タスク内のエラーは黙って飲み込まれます — タスク関数内に try/excel を追加します
- タスクは変更可能なオブジェクトの**コピー**を受け取ります - 変更は応答に影響しません