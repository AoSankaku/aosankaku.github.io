import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"

import useSiteMetadata from "Hooks/useSiteMetadata"
import defaultOpenGraphImage from "../images/og-default.png"

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

const SEO: React.FC<SEOProps> = ({ title, desc = null, image }) => {
  const site = useSiteMetadata()
  const description = desc ?? site.description
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
    (image ? site.siteUrl + image : site.siteUrl + defaultSEOImage!.file!.childImageSharp!.gatsbyImageData!.images!.fallback!.src)

  return (
    <Helmet
      htmlAttributes={{ lang: site.lang ?? DEFAULT_LANG }}
      title={title ? title + " - Blue Triangle's Homepage" : "Blue Triangle's Homepage"}
      titleTemplate={`%s | ${site.title}`}
      meta={
        [
          {
            name: "description",
            content: description,
          },
          {
            property: "og:title",
            content: title,
          },
          {
            property: "og:description",
            content: description,
          },
          {
            property: "og:type",
            content: "website",
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:creator",
            content: site.author,
          },
          {
            name: "twitter:title",
            content: title,
          },
          {
            name: "twitter:description",
            content: description,
          },
          {
            property: "image",
            content: ogImageUrl,
          },
          {
            property: "og:image",
            content: ogImageUrl,
          },
          {
            property: "twitter:image",
            content: ogImageUrl,
          },
        ] as Meta
      }
    />
  )
}

export default SEO
