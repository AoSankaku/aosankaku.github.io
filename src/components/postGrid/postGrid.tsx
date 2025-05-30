import React, { useRef } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { graphql, useStaticQuery } from "gatsby"

import type Post from "Types/Post"
import Card from "./card"
import useInfiniteScroll from "./useInfiniteScroll"
import { ThumbnailWrapper } from "./card/centeredImg"

interface PostGridProps {
  posts: Post[]
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const scrollEdgeRef = useRef<HTMLDivElement>(null)
  const currentList = useInfiniteScroll({
    posts,
    scrollEdgeRef,
    maxPostNum: 10,
    offsetY: 200,
  })

  return (
    <Grid role="list">
      {currentList.map(data => {
        const { id, slug, title, desc, date, category, thumbnail, alt } = data
        const defaultSEOImageId = useStaticQuery<Queries.Query>(graphql`
        query MyQuery {
          file(absolutePath: {regex: "/og-default.png/"}) {
            childImageSharp {
              id
            }
          }
        }
        `)
        const ariaLabel = `${title} - ${category} - Posted on ${date}`
        return (
          <List key={id} role="listitem">
            <Link to={slug ?? ""} aria-label={ariaLabel}>
              <Card
                thumbnail={thumbnail ? thumbnail : defaultSEOImageId!.file!.childImageSharp!.id}
                alt={alt}
                category={category}
                title={title}
                desc={desc}
                date={date}
                tags={[]}
              />
            </Link>
          </List>
        )
      })}
      <div ref={scrollEdgeRef} />
    </Grid>
  )
}

const Grid = styled.ul`
  display: grid;
  grid-gap: var(--grid-gap-xl);
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  list-style: none;

  & > li {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    grid-gap: var(--grid-gap-lg);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`

const List = styled.li`
  box-sizing: border-box;
  grid-column: span 1;

  a {
    display: block;
    height: 100%;
  }

  a:hover ${ThumbnailWrapper}::after, a:focus ${ThumbnailWrapper}::after {
    opacity: 1;
  }

  & .gatsby-image-wrapper {
    transition: opacity 1s ease-out, transform 0.5s ease;
  }

  a:hover,
  a:focus {
    .gatsby-image-wrapper {
      transform: scale(1.03);
    }
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    grid-column: span 2;
  }
`

export default PostGrid
