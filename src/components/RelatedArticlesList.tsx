import React from "react"
import useXorShift from "Hooks/useXorShift"
import { Link } from "gatsby"

type Props = {
  articleId: string;
  relatedPosts: {
    fields: {
      slug: string;
    }
    frontmatter: {
      date: string;
      title: string;
    }
  }[];
}

//同じタグ（実装予定）から2、同じカテゴリから1、他にランダムに2を取り出す

const RelatedArticlesList: React.FC<Props> = ({ articleId, relatedPosts }) => {

  //定数定義
  const relatedArticlesCount = 4

  //どうやらcreateResolversで作ったやつはsortできないらしい…ポンコツかよ…
  //しょうがないので、dateを取得することを前提としてsortを進める
  const sortedRelatedPosts = relatedPosts.sort(
    (a, b) =>
      (new Date(a.frontmatter.date)).getTime() - (new Date(b.frontmatter.date).getTime())
  )

  //sort完了後、articleId（UUID）を基に関連記事の番号を（ランダムだけど一意に）決定する
  //アルゴリズムはXorShift
  const articleIdHex = (articleId as string).replace(/-/g, "")
  const slicedArticleIdHex = articleIdHex.slice(0, 8)
  const slicedArticleIdDec = parseInt(slicedArticleIdHex, 16)

  const relatedArticleIds = useXorShift(slicedArticleIdDec, relatedArticlesCount, 0, relatedPosts.length - 1, false)
    .sort((a, b) => b - a)

  console.log(relatedArticleIds)

  const RelatedArticlesListItems = () => {
    const list = relatedArticleIds.map(id => {
      console.log(relatedPosts[id].frontmatter.title)
      return (
        <li><Link to={relatedPosts[id].fields.slug}>{relatedPosts[id].frontmatter.title}</Link></li>
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