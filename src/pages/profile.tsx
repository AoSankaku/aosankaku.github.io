import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Layout from "Layouts/layout"
import Seo from "Components/Seo"
import Markdown from "Styles/markdown"
import { rhythm } from "Styles/typography"

const Profile = () => {
  const data = useStaticQuery<Queries.Query>(graphql`
    query Profile {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/.*\/profile.md$/" } }) {
        edges {
          node {
            html
          }
        }
      }
    }
  `)

  const markdown = data.allMarkdownRemark.edges[0].node.html

  return (
    <Layout>
      <Container
        dangerouslySetInnerHTML={{ __html: markdown ?? "" }}
        rhythm={rhythm}
      ></Container>
    </Layout>
  )
}

const Container = styled(Markdown).attrs({
  as: "main",
})`
  width: var(--post-width);
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 6rem;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-xl);
    width: 87.5%;
  }

  h1 {
    margin-bottom: 2rem;
  }

  h2 {
    margin-top: var(--sizing-lg);

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.25rem;
    }
  }
`

export default Profile

export const Head = () => {
  return <Seo title="Profile" />
}