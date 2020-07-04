# YTChatArchive

## Easiest How to Use

1. (On VS Code) Command `Remote-Containers: Open Repository in Container` with this repository
2. (On VS Code) Rewrite `videoID` in src/main.ts
3. (On VS Code terminal) `npm start`

## Keep in Mind

This is hacky, so use carefully on YOUR RESPONSIBILITY

## 先行研究

[雑記帳(@watagasi\_) "Python で YouTube Live のアーカイブからチャット（コメント）を取得する" 20181006](http://watagassy.hatenablog.com/entry/2018/10/06/002628)
[雑記帳(@watagasi\_) "Python で YouTube Live のアーカイブからチャット（コメント）を取得する（改訂版）" 2020-10-08](http://watagassy.hatenablog.com/entry/2018/10/08/132939)
[youtube_chat_crawler kkorona/youtube_chat_crawler from 2019-07-10](https://github.com/kkorona/youtube_chat_crawler)
[youtube_chat_crawler geerlingguy/youtube_chat_crawler from 2020-06-25](https://github.com/geerlingguy/youtube_chat_crawler)
[おあ バーチャル Youtuber の配信アーカイブからコメントとスパチャを取得する方法(Python) 2020-06-30](https://note.com/or_ele/n/n5fc139ff3f06)
[【python】YouTube Live のアーカイブからチャットを取得する 2020-02-12](https://yasulab-pg.com/%E3%80%90python%E3%80%91youtube-live%E3%81%AE%E3%82%A2%E3%83%BC%E3%82%AB%E3%82%A4%E3%83%96%E3%81%8B%E3%82%89%E3%83%81%E3%83%A3%E3%83%83%E3%83%88%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B/)

[Flow Youtube Chat](https://greasyfork.org/ja/scripts/377491-flow-youtube-chat/code)

## YT internal analysis

`window["ytInitialData"]`に viewer が処理する action リストを持っているみたい.
データ構造も comment というよりは addComment action みたいな感じがある.
