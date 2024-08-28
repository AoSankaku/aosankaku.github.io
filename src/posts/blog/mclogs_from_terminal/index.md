---
title: "【mclo.gs】サーバーのログファイルを簡単に共有する方法"
category: "Minecraft"
date: "2024-08-28T12:00:00+09:00"
desc: "マインクラフトでクラッシュした時に、簡単にログファイルを共有しよう！"
tags:
  - Ubuntu
---

## 結論（時間のない人向け）

`latest.log`のところをログファイルへのパスに置き換えれば使えます。

```bash
curl -X POST -d "content=$(<latest.log)" https://api.mclo.gs/1/log
```

または

```bash
curl -X POST -d "content=$(cat latest.log)" https://api.mclo.gs/1/log
```

## どうしてログファイルの共有を簡単にやりたかったのか

主に以下の理由です。

- マイクラサーバー運営時、Ubuntuのままだとログが読みづらすぎる
- MOD開発者に共有できない
- 誰かに助けてもらうときにログファイルを渡すのが面倒

となり、「簡単にやる方法ないのかな…」となったのが発端です。

## とりあえずチャレンジ

[mclo.gsのAPIの仕様](https://api.mclo.gs)を見て、mclo.gsに直接ubuntuサーバーなどのターミナルからログを上げてみます。

(これは動きません...)

```bash
curl -X POST -F 'content=./latest.log' https://api.mclo.gs/1/log
```

これだとファイル名だけがログとして上がってしまいます。迷惑な話。

## 友人（Bing AI）に助けてもらった

どうやら、いい感じにやる方法があるらしく、二つほど教えてもらいました。

Bashのリダイレクトを使う方法

```bash
curl -X POST -d "content=$(<latest.log)" https://api.mclo.gs/1/log
```

Catコマンドを使う方法

```bash
curl -X POST -d "content=$(cat latest.log)" https://api.mclo.gs/1/log
```

## おまけ

動いたは動いたのですが、Bashのリダイレクトを使う方法の中に出てくる

```bash
"content=$(<latest.log)"
```

はどんな動きをしているのか気になったのでおまけで調べてみました。

### 説明
- `$()`
  - [とほほのBash入門](https://www.tohoho-web.com/ex/shell.html#command-replace)によると
  - > $(...) または `...` の中にコマンドを書くと、コマンドの出力が文字列として扱われます。
- `<`
  - [とほほのBash入門](https://www.tohoho-web.com/ex/shell.html#in-out-redirect)によると
  - > `command < file` fileの内容をcommandの標準入力に渡す

### 動きを考えてみる

1. `<`を使用して、ファイルの中身を標準入力に渡す
2. `$()`によって、`content=`の後に代入している

## あとがき

今回、この記事を書いていて、「うーん…まだまだ、Bashに対する知識が少ないな:neko_thinking_nya:」と感じたので、サーバーを触ったりしていく中で、知識をつけていきたいなと思っています。

この記事は[@sysnote8](https://misskey.systems/@sysnote8)に手伝ってもらいました。お礼に全マシ二郎を奢る契約をしています。

https://misskey.systems/@sysnote8