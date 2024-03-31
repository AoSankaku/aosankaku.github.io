import React, { useState } from "react"
import Layout from "Layouts/layout"
import styled from "styled-components"
import { graphql } from "gatsby"
import PostGrid from "Components/postGrid"
import type Post from "Types/Post"

type Props = {
  data: {
    allMarkdownRemark: {
      nodes: {}[];
      totalCount: number;
    }
  }
  pageContext: {
    rawTag: string
  }
}

const Tag: React.FC<Props> = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  const { nodes, totalCount } = allMarkdownRemark

  console.dir(nodes)

  const posts = []
  nodes.forEach((node) => {
    const { id } = node
    const { slug } = node.fields!
    const { title, desc, date, category, thumbnail, alt, tags } = node.frontmatter!
    const { childImageSharp } = thumbnail ? thumbnail! : { childImageSharp: undefined }
    posts.push({
      id,
      slug,
      title,
      desc,
      date,
      category,
      thumbnail: childImageSharp?.id,
      alt,
      tags,
    })
  })

  return (
    <Layout>
      <Container>
        <TagName>{`「${pageContext.rawTag}」タグのついた記事（${totalCount}件）`}</TagName>
        <PostGrid posts={posts} />
      </Container>
    </Layout>
  )
}

const Container = styled.main`
  width: var(--post-width);
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 6rem;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-xl);
    width: 87.5%;
  }
`

const TagName = styled.h1`
  font-weight: var(--font-weight-bold);
  font-size: 2.5rem;
  line-height: 1.8;
  margin: 20px 0px 10px;
  white-space: pre-wrap;
  word-break: auto-phrase;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: 2rem;
  }
`

export const query = graphql`
  query BlogTag ($rawTag: String!) {
    allMarkdownRemark (
      filter: { frontmatter: {tags: {in: [$rawTag]}} }
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      nodes {
        id
        frontmatter {
          title
          category
          date(formatString: "YYYY-MM-DD")
          desc
          thumbnail {
            childImageSharp {
              id
            }
            base
          }
          alt
        }
        fields {
          slug
        }
      }
    }
  }    
`

export default Tag

//メモ：使わなかったクエリ

/* マークダウンクエリに対して数を求めるクエリ

    tags: allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }

    そのタグの投稿数の取得

    
    count: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }

*/