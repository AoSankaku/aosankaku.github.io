---
title: "【Terraria/Ubuntu(Linux)】サーバーにローカルのワールドを引っ越す方法"
category: "Tech"
date: "2024-03-20T16:00:00+09:00"
desc: "テラリアのサーバーで、ローカルでこれまで遊んでいたワールドをアップロードして、使用する方法について説明します。"
thumbnail: ""
alt: ""
---

## 前提

記事のタイトルを読めば分かる通り、すでにTerrariaのサーバーが使えることを前提とします。

一般的なUbuntu等を搭載したVPSを想定しています。それ以外のGUI系レンタルサーバーについてはわかりません。その会社に聞くか、よそで調べてください。

[【Ubuntu(Linux)】Terrariaのサーバー開くのちょろすぎて草](../terraria_server/)

## 引越し元のワールド特定

書き込めたら、引っ越し元のワールドを特定します。と言っても、ワールド名を真面目につけていないならば、特定方法は**気合い**しかありません。

まずは、テラリアのワールドデータを探すために以下の場所を開きます。

- Windowsの場合：`C:Users/ユーザー名/Documents/My Games/Terraria`
- Macの場合：`ライブラリ/Application Support/Terraria`
- Linuxの場合：`~/.local/share/Terraria`

気合いを全力で発揮し、ワールドが入っていそうなフォルダを見つけたら日時順に並べてしまいましょう。そうすればあとは目標のワールドを特定できるはずです。ワールドの拡張子は`.wld`です。

なお、その中に入っている`.bak`で終わるファイルは無視してください。ただのバックアップファイルだと思います。持っていかなくても問題ありません。

## サーバーにアップロード

Ubuntuをご利用の変態の皆様方ならご存知のことと思いますが、`sftp`というものを使用してファイルをサーバーに送りつけることができます。

```sh
sftp <IPアドレス> -p <ポート番号>
```

で、うまいことcdやputを用いてアップロードしましょう。sftpについては、面倒なので解説しません。

コマンドでカチカチするsftpが難しすぎるように感じる方は、[サーバーは諦める](https://forest.watch.impress.co.jp/library/software/winscp/)という選択肢があります。常に[逃げる心](https://google.com/)を忘れないようにしましょう。

ファイルの場所はどこでも構いませんが、テラリアの実行ファイルがあるところに`worlds`というフォルダでも適当に作っておけばいいんじゃないでしょうか。

## serverconfig.txtを準備する

最後にやることは単純です。サーバーコンフィグを書いたテキストファイルを準備しましょう。以上です。

configファイルがないなら、作ってしまいましょう。Terrariaのサーバー実行ファイルは、コンフィグファイルなど自動生成してくれません。自力で準備する必要があります。

ファイル名にも指定はありません。なんでもOKです。ここでは、`serverconfig.txt`と打つのはあまりに面倒なので`cf.txt`と命名したことにして進めていきます。

```text:title=cf.txt
worldpath=./worlds
world=./worlds/main.wld
```

以上2点を書き込みます。それ以外にも「worldname」とか設定できはしますが、元のワールド名が優先になりどうせ無視されるので、書かなくて大丈夫です（実証済み）。

## あとは起動したら勝手に読み込む

上の設定で「world=」と書いた場合、サーバー起動時に勝手に読み込むらしいです。

起動コマンドで、作成したコンフィグを読み込むのを忘れないようにしましょう。これを忘れると、今までやってきたことの意味がありません。気をつけてくださいね。

```sh:title=run.sh
./TerrariaServer.bin.x86_64 -config ./cf.txt
```

私の指示に反抗して`serverconfig.txt`とかカッコつけた名前をつけてしまった人は、コマンドを適切に変更してください。大文字小文字も関係あります。

## 以上！

あとはこれまでのワールドとセーブデータがバッチリ引き継げていることに安堵しながら、楽しくマルチプレイをするだけです。お疲れさまでした。

他に同じようなことで悩んでいる人がいたら、このページの下のボタンからシェアとかしてくれると喜びます。Misskey、Mastodonにも対応しています。

## 参考文献

- https://takaichifactory.com/1649
- https://steamcommunity.com/app/105600/discussions/0/541907867760001774?l=japanese