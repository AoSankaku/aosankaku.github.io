import React from "react"
import xorShiftArray from "Functions/xorShiftArray"
import { Link } from "gatsby"

type Props = {
  articleId: string;
  //そのうち直す（）
  relatedPosts: {
    frontmatter: {
      date: string;
      title: string;
    }
    fields: {
      slug: string
    }
  }[];
}

//同じタグ（実装予定）から2、同じカテゴリから1、他にランダムに2を取り出す
//…とかそんな複雑な処理作れるわけ無いやん！ｗ

const RelatedArticlesList: React.FC<Props> = ({ articleId, relatedPosts }) => {

  //定数定義
  const relatedArticlesCount = 5

  console.dir(typeof (relatedPosts))

  //どうやらcreateResolversで作ったやつはsortできないらしい…ポンコツかよ…
  //しょうがないので、dateを取得することを前提としてsortを進める
  const sortedRelatedPosts = relatedPosts.sort(
    (a, b) =>
      (new Date(a.frontmatter.date)).getTime() - (new Date(b.frontmatter.date).getTime())
  )

  //sort完了後、articleId（UUID）を基に関連記事の番号を（ランダムだけど一意に）決定する
  //アルゴリズムはXorShift
  const articleIdHex = (articleId).replace(/-/g, "")
  const slicedArticleIdHex = articleIdHex.slice(0, 8)
  const slicedArticleIdDec = parseInt(slicedArticleIdHex, 16)

  const relatedArticleIds = xorShiftArray(slicedArticleIdDec, relatedArticlesCount, 0, relatedPosts.length - 1, false)
    .sort((a, b) => b - a)

  console.log(relatedArticleIds)

  const RelatedArticlesListItems = () => {
    const list = relatedArticleIds.map(id => {
      console.log(relatedPosts[id].frontmatter.title)
      return (
        <li key={relatedPosts[id].fields.slug}><Link to={relatedPosts[id].fields.slug}>{relatedPosts[id].frontmatter.title}</Link></li>
      )
    })
    return list
  }


  return (
    <ul>
      <RelatedArticlesListItems />
    </ul>
  )
}

export default RelatedArticlesList