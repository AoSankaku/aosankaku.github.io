---
title: "【ウディタ】宿屋の作り方（ウディタ講義第2章第2回のコマンド）"
category: "YouTube"
date: "2024-08-26T00:00:00+09:00"
desc: "ウディタ講義第2章第2回の最後に扱った、「一括で取引ができるコマンド」のコマンド文とイベントコードです。"
tags:
  - ウディタ
---

動画を公開してからこちらの記事掲載まで、遅れてすみませんでした。以下がコマンド文とイベントコードです。

このイベントをそっくりそのままパクるには、イベントコードをすべてコピーしてからウディタのマップイベントで右クリックして「ｸﾘｯﾌﾟﾎﾞｰﾄﾞ→ｺｰﾄﾞ貼り付け」を押します。なお、このコードに関する著作権は完全に放棄するため、心置きなく丸パクリしまくってください。

注意：以下のコードは講義用のものです。まだ講義で扱っていない機能は使用しておらず、読みやすさやデバッグ性に若干の難があります。

## コマンド文

```
■イベントの挿入： このEvのSelf0 = コモン17：[ ▲アイテム所持数取得 ] / 0:薬草
■変数操作: このEvのSelf1 = このEvのSelf0 / 3 
■条件分岐(変数):  【1】 このEvのSelf0  が   3 以上 
-◇分岐： 【1】  [ このEvのSelf0  が  3 以上  ]の場合↓
 |▼ 薬草（セルフ変数0）が3以上の時の処理
 |■条件分岐(変数):  【1】 このEvのSelf1  が   1 と同じ 
 |-◇分岐： 【1】  [ このEvのSelf1  が  1 と同じ  ]の場合↓
 | |▼ セルフ変数1が1と同じ、すなわち取引可能回数が1回の場合
 | |■文章:だれか「取引してしんぜよう\n        薬草3個→薬ビン1個でどうだい？
 | |■文章選択肢:/ 【1】1回取引する / 【2】取引しない 
 | |-◇選択肢：【1】 1回取引する                                   の場合↓
 | | |■イベントの挿入： コモン0：[ ○アイテム増減 ] / 14:薬ビン / 1 / 1:あり[単位：～個]
 | | |■イベントの挿入： コモン0：[ ○アイテム増減 ] / 0:薬草 / -3 / 0:なし
 | | |■
 | |-◇選択肢：【2】 取引しない                                    の場合↓
 | | |■
 | |◇分岐終了◇
 | |■
 |-◇上記以外
 | |▼ セルフ変数1が1以外の場合、すなわち取引可能回数が1回より大きい場合
 | |▼ え？「1と同じ」以外の場面だからバグるんじゃないかって？
 | |▼ セルフ変数1番は
 | |▼ 「3以上であることがわかっているセルフ変数0番を、3で割った数」だから、
 | |▼ 「セルフ変数1番が1以上」なのはわかっていて、
 | |▼ 「セルフ変数1番が1以上であって、1ではない数」といえば
 | |▼ 上方向（1より大きい）しかないよね
 | |▼  
 | |▼ 分岐が複雑になってわかりにくいって？
 | |▼ ←にある縦線を参考にするといいよ
 | |▼ 詳しくは今後のAdvanced講義でやるかも
 | |■文章:だれか「取引してしんぜよう\n        薬草3個→薬ビン1個でどうだい？
 | |■文章選択肢:/ 【1】1回取引する / 【2】\self[1]回取引する / 【3】取引しない 
 | |-◇選択肢：【1】 1回取引する                                   の場合↓
 | | |■イベントの挿入： コモン0：[ ○アイテム増減 ] / 14:薬ビン / 1 / 1:あり[単位：～個]
 | | |■イベントの挿入： コモン0：[ ○アイテム増減 ] / 0:薬草 / -3 / 0:なし
 | | |■
 | |-◇選択肢：【2】 \self[1]回取引する                            の場合↓
 | | |■イベントの挿入： コモン0：[ ○アイテム増減 ] / 14:薬ビン / このEvのSelf1 / 1:あり[単位：～個]
 | | |■変数操作: このEvのSelf1 *= 0 + -3 
 | | |■イベントの挿入： コモン0：[ ○アイテム増減 ] / 0:薬草 / このEvのSelf1 / 1:あり[単位：～個]
 | | |■
 | |-◇選択肢：【3】 取引しない                                    の場合↓
 | | |■
 | |◇分岐終了◇
 | |■
 |◇分岐終了◇
 |■
-◇上記以外
 |▼ 薬草（セルフ変数0）が3以上ではない時の処理
 |■文章:だれか「取引してしんぜよう\n        薬草3個→薬ビン1個で取引しちゃうぞ
 |■
◇分岐終了◇

```

## イベントコード（コピペ用）

```
WoditorEvCOMMAND_START
[210][4,0]<0>(500017,16777217,0,1100000)()
[121][4,0]<0>(1100001,1100000,3,12288)()
[111][4,0]<0>(17,1100000,3,1)()
[401][1,0]<0>(1)()
[103][0,1]<1>()("薬草（セルフ変数0）が3以上の時の処理")
[111][4,0]<1>(17,1100001,1,2)()
[401][1,0]<1>(1)()
[103][0,1]<2>()("セルフ変数1が1と同じ、すなわち取引可能回数が1回の場合")
[101][0,1]<2>()("だれか「取引してしんぜよう<\n>　　　　薬草3個→薬ビン1個でどうだい？")
[102][1,2]<2>(50)("1回取引する","取引しない")
[401][1,0]<2>(2)()
[210][5,0]<3>(500000,3,14,1,1)()
[210][5,0]<3>(500000,3,0,-3,0)()
[0][0,0]<3>()()
[401][1,0]<2>(3)()
[0][0,0]<3>()()
[499][0,0]<2>()()
[0][0,0]<2>()()
[420][1,0]<1>(0)()
[103][0,1]<2>()("セルフ変数1が1以外の場合、すなわち取引可能回数が1回より大きい場合")
[103][0,1]<2>()("え？「1と同じ」以外の場面だからバグるんじゃないかって？")
[103][0,1]<2>()("セルフ変数1番は")
[103][0,1]<2>()("「3以上であることがわかっているセルフ変数0番を、3で割った数」だから、")
[103][0,1]<2>()("「セルフ変数1番が1以上」なのはわかっていて、")
[103][0,1]<2>()("「セルフ変数1番が1以上であって、1ではない数」といえば")
[103][0,1]<2>()("上方向（1より大きい）しかないよね")
[103][0,1]<2>()(" ")
[103][0,1]<2>()("分岐が複雑になってわかりにくいって？")
[103][0,1]<2>()("←にある縦線を参考にするといいよ")
[103][0,1]<2>()("詳しくは今後のAdvanced講義でやるかも")
[101][0,1]<2>()("だれか「取引してしんぜよう<\n>　　　　薬草3個→薬ビン1個でどうだい？")
[102][1,3]<2>(67)("1回取引する","\self[1]回取引する","取引しない")
[401][1,0]<2>(2)()
[210][5,0]<3>(500000,3,14,1,1)()
[210][5,0]<3>(500000,3,0,-3,0)()
[0][0,0]<3>()()
[401][1,0]<2>(3)()
[210][5,0]<3>(500000,3,14,1100001,1)()
[121][4,0]<3>(1100001,0,-3,768)()
[210][5,0]<3>(500000,3,0,1100001,1)()
[0][0,0]<3>()()
[401][1,0]<2>(4)()
[0][0,0]<3>()()
[499][0,0]<2>()()
[0][0,0]<2>()()
[499][0,0]<1>()()
[0][0,0]<1>()()
[420][1,0]<0>(0)()
[103][0,1]<1>()("薬草（セルフ変数0）が3以上ではない時の処理")
[101][0,1]<1>()("だれか「取引してしんぜよう<\n>　　　　薬草3個→薬ビン1個で取引しちゃうぞ")
[0][0,0]<1>()()
[499][0,0]<0>()()
WoditorEvCOMMAND_END
```

## 「1回だけ取引できるようにする取引人」の作り方

こちらは難しい課題ではないと思います。セルフ変数3番あたりを適当に取り、「取引成立（アイテムの受取）」と同じタイミングで変数を操作（例えば1を代入）し、取引コード全体を「セルフ変数3番が0なら～」で囲ってしまえばいいでしょう。

条件分岐で囲いまくると冗長になってしまいますが、今回の場合は他にいい方法があるわけでもありません。このやり方で十分です。