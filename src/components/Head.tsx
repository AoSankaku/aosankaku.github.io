import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import useSiteMetadata from "Hooks/useSiteMetadata"

const DEFAULT_LANG = "ja"

type Meta = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>[]

interface SEOProps extends Pick<Queries.MarkdownRemarkFrontmatter, "title"> {
  desc?: Queries.Maybe<string>
  image?: Queries.Maybe<string>
  defaultSEOImage?: Queries.Maybe<Queries.ImageSharp>
  meta?: Meta
}

const Head: React.FC<SEOProps> = ({ title, desc = null, image }) => {
  const site = useSiteMetadata()
  const ogTitle = title ? `${title} | ${site.title}` : ""
  const description = desc ?? site.description as string
  const defaultSEOImage = useStaticQuery<Queries.Query>(graphql`
  query DefaultSEOImage {
    file(absolutePath: {regex: "/og-default.png/"}) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
  `)
  const ogImageUrl =
    (image
      ? site.siteUrl + image
      : site.siteUrl + defaultSEOImage!.file!.childImageSharp!.gatsbyImageData!.images!.fallback!.src
    )

  return (
    <>
      <title>{ogTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={`${ogImageUrl}`} />
      <meta property="og:url" content={`${site.siteUrl}`} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={"website"} />
      <meta property="og:site_name" content={site.title as string} />
      <meta property="og:image" content={`${ogImageUrl}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.author as string} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${ogImageUrl}`} />
    </>
  )
}

export default Head
