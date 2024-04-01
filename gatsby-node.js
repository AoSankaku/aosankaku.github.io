const path = require(`path`)
const _ = require("lodash")
const normalizeTagName = require("./src/functions/normalizeTagName")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const mainTemplate = path.resolve(`./src/pages/index.tsx`)
  const blogPostTemplate = path.resolve(`./src/templates/blogPost.tsx`)
  const tagPageTemplate = path.resolve(`./src/templates/tag.tsx`)

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(posts/blog)/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      categoriesGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { category: SELECT } }) {
          fieldValue
          totalCount
        }
      }
      tags: allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const posts = result.data.postsRemark.edges

  posts.forEach(({ node }, index) => {
    console.log(index)
    //古い記事のほうが番号が多いらしい、ふざけるな
    const next = index == posts.length - 1 ? null : posts[index + 1].node;
    const prev = index == 0 ? null : posts[index - 1].node;

    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
        index: index,
        //ひっくり返しておく
        previous: index == posts.length - 1 ? "" : next.fields.slug,
        next: index == 0 ? "" : prev.fields.slug,
      },
    })
  })

  const categories = result.data.categoriesGroup.group

  categories.forEach(category => {
    createPage({
      path: `/category/${_.kebabCase(category.fieldValue)}/`,
      component: mainTemplate,
      context: {
        category: category.fieldValue,
      },
    })
  })

  const tags = result.data.tags.group
  tags.forEach(e => {
    createPage({
      path: `/tags/${normalizeTagName(e.fieldValue)}`,
      component: tagPageTemplate,
      context: {
        tag: normalizeTagName(e.fieldValue),
        rawTag: e.fieldValue
      },
    })
  })
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MarkdownRemark: {
      relatedPostsByCategory: {
        type: ['MarkdownRemark'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                id: {
                  ne: source.id,
                },
                frontmatter: {
                  category: {
                    eq: source.frontmatter.category,
                  },
                },
              },
            },
            type: 'MarkdownRemark',
          })
          return entries
        },
      },
      relatedPostsByTag: {
        type: ['MarkdownRemark'],
        resolve: async (source, args, context, info) => {
          if (typeof source.frontmatter.tags === undefined) return null;
          if (!Array.isArray(source.frontmatter.tags)) return null;
          console.log(source.frontmatter.tags)
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                id: {
                  ne: source.id,
                },
                frontmatter: {
                  tags: {
                    in: source.frontmatter.tags,
                  },
                },
              },
            },
            type: 'MarkdownRemark',
          })
          return entries
        },
      },

      //以下、rawTags（ケバブケースになった奴を返す）の残骸

      /*
      frontmatter: {
        rawTags: {
          type: ['FrontMatter'],
          resolve: async (source, args, context, info) => {
            const { queries } = await context.nodeModel.findAll({
              query: {
                filter
              }
            })
          }
        }
      }
      */

      //以下、graphqlの結果を上書きしようとしたときの残骸

      /*
      timeToRead: {
        resolve: async (source, args, context, info) => {
          //sourceには親データのすべてが入る
          console.dir(source)
          //この場合、何も入っていない
          console.dir(args)
          console.log("context")
          console.dir(context)
          console.log("info")
          console.dir(info)
          if (source.frontmatter.thumbnail == "") {
            console.log("NO THUMBNAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          }
          return 114514
        }
      },
      */

      /*
      frontmatter: {
        resolve: async (source, args, context, info) => {
          console.log("unchi")
          const defaultImage = await context.nodeModel.findOne({
            type: "GatsbyImageData",
            query: {
              filter: {
                fileAbsolutePath: {
                  regex: "/og-default.png/"
                }
              }
            },
            firstOnly: true
          })
          console.log(defaultImage)
          return {
            ...source.frontmatter,
            title: "fuckyou",
            thumbnail: defaultImage,
          }
        },

        thumbnail: {
          type: 'thumbnail',
          resolve: async (source, args, context, info) => {
            console.log(source.frontmatter.thumbnail)
          },
          childImageSharp: {
            gatsbyImageData: {
              type: 'gatsbyImageData',
              resolve: async (source, args, context, info) => {
                console.log("hej:", source.frontmatter.thumbnail)
                if (source.frontmatter.thumbnail) {
                  return source.frontmatter.thumbnail;
                } else {
                  const defaultImage = await context.nodeModel.findOne({
                    type: 'gatsbyImageData',
                    query: {
                      filter: {
                        fileAbsolutePath: {
                          regex: "/og-default.png/"
                        }
                      }
                    },
                    firstOnly: true
                  })
                  console.log("running if else")
                  console.log(defaultImage)
                  return defaultImage
                }
              }
            }
          }
        }
      }*/
    },
  }

  createResolvers(resolvers)
}