import React, { useMemo } from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import type { IGatsbyImageData } from "gatsby-plugin-image"

import type Post from "Types/Post"

interface CenteredImgProps extends Pick<Post, "alt"> {
  src: Post["thumbnail"]
}

const DEFAULT_ALT = "Thumbnail Image"

const CenteredImg: React.FC<CenteredImgProps> = ({ src, alt }) => {
  const data = useStaticQuery<Queries.Query>(graphql`
    query CenteredImg {
      allImageSharp {
        edges {
          node {
            id
            gatsbyImageData(
              layout: FULL_WIDTH
              aspectRatio: 1.91
              placeholder: BLURRED
              transformOptions: {
                fit: COVER
                cropFocus: ENTROPY
              }
            )
          }
        }
      }
    }
  `)
  //aspectRatioのデフォルト値は1.77、黄金比は1.68、OGPに最適なのは1.91
  //cropFocusをATTENTIONやENTROPYにすると自動に、CENTERにすると中心になる

  const image = useMemo(() => {
    const imageSharp = data.allImageSharp.edges.find(
      edge => edge.node.id === src
    )
    return imageSharp?.node.gatsbyImageData as IGatsbyImageData
  }, [src, data.allImageSharp.edges])

  return (
    <ThumbnailWrapper>
      <InnerWrapper>
        <GatsbyImage image={image} loading="eager" alt={alt ?? DEFAULT_ALT} />
      </InnerWrapper>
    </ThumbnailWrapper>
  )
}

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: var(--color-dimmed);
    transition: 0.3s ease;
  }
`

const InnerWrapper = styled.div`
  overflow: hidden;
`

export default React.memo(CenteredImg)
