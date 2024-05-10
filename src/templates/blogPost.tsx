import React, { useState, useEffect } from "react"
import { graphql, Link, type PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import styled from "styled-components"

import Layout from "Layouts/layout"
import Seo from "Components/Seo"
import ShareButtons from "Components/ShareButtons"
import TipArea from "Components/TipArea"
import Comment from "Components/comment"
import { rhythm } from "Styles/typography"
import Category from "Styles/category"
import DateTime from "Styles/dateTime"
import Markdown from "Styles/markdown"

import { FaArrowRight, FaArrowLeft } from "react-icons/fa6"
import RelatedArticlesList from "Components/RelatedArticlesList"


import TagButton from "Components/tag/tagButton"

/*
import ScrollHint from "scroll-hint"

new ScrollHint('.js-scrollable', {
  i18n: {
    scrollable: 'スクロールできます'
  }
});
*/

type Post = {
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    tags: string[];
    thumbnail: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      }
    }
  };
}

type BlogPostQuery = Queries.Query & {
  markdownRemark: {
    relatedPostsByCategory: {
      id: string;
      frontmatter: {
        date: string;
        title: string;
      }
      fields: {
        slug: string;
      }
    }[];
    relatedPostsByTag: {
      id: string;
      frontmatter: {
        date: string;
        title: string;
      }
      fields: {
        slug: string;
      }
    }[];
  }
  next: Post | null;
  previous: Post | null;
  defaultImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    }
  }
};

const BlogPost: React.FC<PageProps<BlogPostQuery>> = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html, relatedPostsByTag, relatedPostsByCategory, id } = markdownRemark!
  const { title, desc, thumbnail, date, category, tags } = frontmatter!

  const [pathName, setPathName] = useState("")

  const { next, previous } = data

  const { defaultImage } = data

  console.dir(relatedPostsByTag)
  console.dir(relatedPostsByCategory)
  const allRelatedPosts = [...relatedPostsByTag, ...relatedPostsByCategory]
  //配列結合・重複消去をカッコつけて表現しただけ
  const relatedPosts = Array.from(
    new Map(
      allRelatedPosts.map(
        (e) => [e.fields.slug, e]
      )
    ).values()
  )
  console.dir(relatedPosts)

  useEffect(() => {
    setPathName(window.location.href)
  }, [])

  return (
    <Layout>
      <main>
        <article>
          <OuterWrapper>
            <InnerWrapper>
              <div>
                <header>
                  <Info>
                    <PostCategory>{category}</PostCategory>
                    <Time dateTime={date!}>{date}</Time>
                  </Info>
                  <Title>{title}</Title>
                  <Desc>{desc}</Desc>
                  {tags ?
                    <TagsContainer>{tags.map(e => (
                      <TagButton tagName={e as string} />
                    ))}</TagsContainer>
                    :
                    <NoTags>{"この記事にはタグがありません"}</NoTags>
                  }
                </header>
                <Divider />
                <Markdown
                  dangerouslySetInnerHTML={{ __html: html ?? "" }}
                  rhythm={rhythm}
                />
                <Markdown rhythm={rhythm}>
                  <h2 style={{ marginTop: "3.2625rem" }}>関連記事</h2>
                  <RelatedArticlesList articleId={id} relatedPosts={relatedPosts} />
                </Markdown>
              </div>
            </InnerWrapper>
          </OuterWrapper>
        </article>
        <ShareButtons title={title as string} articleUrl={pathName} />
        <TipArea />
        <ArticlesNavigationContainer>
          {(next !== null) &&
            <ArticlesPreContainer>
              <Link to={next?.fields.slug as string}>
                <NextArticle>
                  <ArticlesNavigationArrow>
                    <FaArrowLeft /><span>次の記事</span>
                  </ArticlesNavigationArrow>
                  <ArticlesNavigationImage>
                    <GatsbyImage
                      image={
                        next.frontmatter.thumbnail?.childImageSharp
                          ? next.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData
                          : defaultImage.childImageSharp.gatsbyImageData
                      }
                      alt="Thumbnail of the next article"
                    />
                  </ArticlesNavigationImage>
                  <ArticlesNavigationParagraph>
                    {next?.frontmatter.title}
                  </ArticlesNavigationParagraph>
                </NextArticle>
              </Link>
            </ArticlesPreContainer>
          }

          {(previous !== null) &&
            <ArticlesPreContainer>
              <Link to={previous?.fields.slug as string}>
                <PreviousArticle>
                  <ArticlesNavigationArrow>
                    <span>前の記事</span><FaArrowRight />
                  </ArticlesNavigationArrow>
                  <ArticlesNavigationImage>
                    <GatsbyImage
                      image={
                        previous.frontmatter.thumbnail?.childImageSharp
                          ? previous.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData
                          : defaultImage.childImageSharp.gatsbyImageData
                      }
                      alt="Thumbnail of the previous article"
                    />
                  </ArticlesNavigationImage>
                  <ArticlesNavigationParagraph>
                    {previous?.frontmatter.title}
                  </ArticlesNavigationParagraph>
                </PreviousArticle>
              </Link>
            </ArticlesPreContainer>
          }
        </ArticlesNavigationContainer>
        <CommentWrap>
          <Comment />
        </CommentWrap>
      </main>
    </Layout >
  )
}

const OuterWrapper = styled.div`
  margin-top: var(--sizing-xl);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-lg);
  }
`

const InnerWrapper = styled.div`
  width: var(--post-width);
  margin: 0 auto;
  padding-bottom: var(--sizing-lg);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 87.5%;
  }
`

const CommentWrap = styled.section`
  width: 100%;
  padding: 0 var(--padding-sm);
  margin: 0 auto;
  margin-bottom: var(--sizing-xl);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: auto;
  }
`

const PostCategory = styled(Category)`
  font-size: 0.875rem;
  font-weight: var(--font-weight-semi-bold);
`

const Info = styled.div`
  margin-bottom: var(--sizing-md);
`

const Time = styled(DateTime)`
  display: block;
  margin-top: var(--sizing-xs);
`

const Desc = styled.p`
  margin-top: var(--sizing-lg);
  line-height: 1.5;
  font-size: var(--text-lg);
  word-break: auto-phrase;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    line-height: 1.31579;
    font-size: 1.1875rem;
  }
`

const TagsContainer = styled.div`
  display: flex;
  margin: var(--sizing-md) 0;
  gap: 10px;
  flex-wrap: wrap;
`

const NoTags = styled.p`
  margin: var(--sizing-md) 0;
  color: var(--color-gray-6);
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-gray-3);
  margin-top: var(--sizing-lg);
  margin-bottom: var(--sizing-lg);
`

const Title = styled.h1`
  font-weight: var(--font-weight-bold);
  line-height: 1.1875;
  font-size: var(--text-xl);
  word-break: auto-phrase;

  @media (max-width: ${({ theme }) => theme.device.md}) {
    line-height: 1.21875;
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    line-height: 1.21875;
    font-size: 2rem;
  }
`

const ArticlesNavigationContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 30px;
  justify-content: center;
  flex-wrap: nowrap;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    flex-direction: column;
    padding: 0;
  }
`

const ArticlesPreContainer = styled.div`
  flex: 1 1 0;
  padding: var(--sizing-md);
  min-width: 0;
`

const ArticleNavigationCommons = styled.div`
  display: grid;
  place-items: center;
  grid-template-areas:
    "arrow arrow"
    "img name";
  grid-template-columns: 100px auto;
  grid-gap: 0.25rem;
  margin: var(--sizing-xs);
  border-radius: 1em;
  padding: 20px;
  width: 100%;
`

const NextArticle = styled(ArticleNavigationCommons)`
  background-color: var(--color-card);
`

const PreviousArticle = styled(ArticleNavigationCommons)`
  background-color: var(--color-card);
`

const ArticlesNavigationArrow = styled.div`
  display: flex;
  gap: 0 10px;
  align-items: center;
  font-size: 1.25rem;
  margin-bottom: var(--color-card);
  grid-area: arrow;
  font-weight: var(--font-weight-semi-bold);
  margin-bottom: var(--sizing-md);
`

const ArticlesNavigationImage = styled.div`
  width: 100px;
  height: 100px;
  grid-area: img;
`

const ArticlesNavigationParagraph = styled.p`
  grid-area: name;
  line-height: 1.5em;
  font-size: 1em;
  padding: 0px 10px;
  align-self: center;
  justify-self: start;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const query = graphql`
  query BlogPostPage ($slug: String!, $previous: String!, $next: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        desc
        thumbnail {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: FIXED)
          }
        }
        date(formatString: "YYYY-MM-DD")
        category
        tags
      }
      relatedPostsByCategory {
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
      }
      relatedPostsByTag {
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
      }
    }
    previous: markdownRemark(fields: { slug: { eq: $previous } }){
      fields {
        slug
      }
      frontmatter {
        title
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 100
              aspectRatio: 1
              placeholder: BLURRED
              transformOptions: {
                fit: COVER
                cropFocus: CENTER
              }
            )
          }
        }
      }
    }
    next: markdownRemark(fields: { slug: { eq: $next } }){
      fields {
        slug
      }
      frontmatter {
        title
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 100
              aspectRatio: 1
              placeholder: BLURRED
              transformOptions: {
                fit: COVER
                cropFocus: CENTER
              }
            )
          }
        }
      }
    }
    defaultImage: file(absolutePath: {regex: "/og-default.png/"}) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 100
          aspectRatio: 1
          placeholder: BLURRED
          transformOptions: {
            fit: COVER
            cropFocus: CENTER
          }
        )
      }
    }
  }
`

export default BlogPost

export const Head = ({ data }: PageProps<BlogPostQuery>) => {
  const thumbnail = data.markdownRemark?.frontmatter?.thumbnail
  const ogImagePath =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    thumbnail && thumbnail?.childImageSharp?.gatsbyImageData!.images!.fallback!.src
  return <Seo
    title={data.markdownRemark?.frontmatter?.title ?? ""}
    desc={data.markdownRemark?.frontmatter?.desc}
    image={ogImagePath}
  />
}