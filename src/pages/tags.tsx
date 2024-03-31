import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import TagButton from "Components/tag/tagButton";
import Layout from "Layouts/layout"
import Seo from "Components/Seo";
import styled from "styled-components";

interface Props {
  allMarkdownRemark: {
    group:
    {
      fieldValue: string;
      totalCount: number;
    }[]
  }
}

const Tags = () => {

  const data = useStaticQuery<Props>(graphql`
    query Tags {
      allMarkdownRemark {
        group(field: {frontmatter: {tags: SELECT}}) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const group = data.allMarkdownRemark.group
  //groupを使うとGraphQLでsortできないらしい、だるい
  const sortedGroup = group.sort((a, b) =>
    b.totalCount - a.totalCount
  )

  console.dir(sortedGroup)

  return (
    <Layout>
      <Container>
        <h1>ブログのタグ一覧</h1>
        <TagsContainer>
          {data && sortedGroup.map(e => <TagButton tagName={e.fieldValue} count={e.totalCount} />)}
        </TagsContainer>
      </Container>
    </Layout>
  )
}

const Container = styled.main`
  h1 {
    font-weight: var(--font-weight-bold);
    font-size: 2.5rem;
    line-height: 1.8;
    margin: 20px 0px 10px;
    white-space: pre-wrap;
    word-break: auto-phrase;

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 2rem;
    }
  }

  width: var(--post-width);
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 6rem;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-xl);
    width: 87.5%;
  }
`

const TagsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  font-size: 1.25rem;
`

export default Tags

export const Head = () => {
  return <Seo title="Tags" />
}