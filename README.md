# GAS
[Google Apps Sctipt](https://script.google.com/)の検証用

## 今日の予定を通知するGAS （send_today_events.js）
### GASにスクリプトをあげる
 左上の「新規スクリプト」で新しいスクリプトし、notice_today_events.jsをコピペで貼り付ける  
（プロジェクト名ファイル名は適当で）

テストで実行してみる  
(権限の承認を求められるので付与する)

TODO githubからクローンしてclaspでGoogleAppsScripptにあげげれるようにする  
 [claspを使い、Google Apps Scriptプロジェクトをgitでバージョン管理する](https://qiita.com/rf_p/items/7492375ddd684ba734f8)

### Discord設定
投稿するチャンネルのチェンネル編集-WebhooksからWebhookを作成  

WEBHOOK URLをコピーしておく

### GASの設定
#### スクリプトプロパティ設定  
プロジェクトのプロパティ-スクリプトのプロパティにDiscordのwebhookのIDとトークンを設定する  
IDとトークンはwebhookのURLから取得する  
https://discordapp.com/api/webhooks/[webhookのID]/[webhookのトークン]  

|プロパティ|値|
|---|---|
|DISCORD_WEBHOOK_ID|[webhookのID]|
|DISCORD_WEBHOOK_TOKEN|[webhookのトークン]|


#### トリガー設定
noticeTodayEvents() を日タイマーで登録
