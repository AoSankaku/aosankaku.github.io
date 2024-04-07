import React from "react"
import ReactDOMServer from "react-dom/server"
import { graphql, useStaticQuery } from "gatsby"
import styled, { keyframes } from "styled-components"

import Layout from "Layouts/layout"
import Seo from "Components/Seo"
import Markdown from "Styles/markdown"
import { rhythm } from "Styles/typography"

import react_logo from "Images/react_logo.png"
import gatsby_monogram from "Images/gatsby_monogram.svg"

import { ImCross } from "react-icons/im";

const About = () => {
  const data = useStaticQuery<Queries.Query>(graphql`
    query About {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
        edges {
          node {
            html
          }
        }
      }
    }
  `)


  //以下はAboutの上部一部を構成する
  const ReactAndGatsbyContainer = styled.div`
    width: 100%;
    align: center;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 0 20px 0;

  `

  const ReactAndGatsbyImgContainer = styled.div`
    max-height: 120px;
    height: auto;
    margin: 10px 30px;
  `

  const ReactAndGatsbyImgWithHeight = styled.img`
    width: 100%;
    height: 100%;
  `

  const ReactLogoSpin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  `

  const ReactLogo = styled(ReactAndGatsbyImgWithHeight)`
  animation: ${ReactLogoSpin} infinite 20s linear;
  `

  const LogoParagraph = styled.p`
    > a {
      padding: 0 0.3em;
    }
  `

  const ReactAndGatsby = () => {
    return (
      <>
        <ReactAndGatsbyContainer>
          <ReactAndGatsbyImgContainer style={{ aspectRatio: 230.11 / 200 }}>
            <ReactLogo src={react_logo} />
          </ReactAndGatsbyImgContainer>
          <ImCross size={50} />
          <ReactAndGatsbyImgContainer style={{ aspectRatio: 1 / 1 }}>
            <ReactAndGatsbyImgWithHeight src={gatsby_monogram} />
          </ReactAndGatsbyImgContainer>
        </ReactAndGatsbyContainer>
        <LogoParagraph>
          このサイトは
          <a href={"https://react.dev"}>React</a>
          と
          <a href={"https://gatsbyjs.com/"}>Gatsby</a>
          で作成し、
          <a href={"https://github.co.jp/features/actions"}>GitHub Actions</a>
          でビルドして
          <a href={
            "https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages"
          }>GitHub Pages</a>
          にデプロイすることで公開しています。
        </LogoParagraph>
      </>
    )
  }

  const reactAndGatsbyHtmlString = ReactDOMServer.renderToString(
    <ReactAndGatsby />
  )

  const markdown = reactAndGatsbyHtmlString + data.allMarkdownRemark.edges[0].node.html

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

export default About

export const Head = () => {
  return <Seo title="About" />
}