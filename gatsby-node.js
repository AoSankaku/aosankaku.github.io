const path = require(`path`)
const _ = require("lodash")
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
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MarkdownRemark: {
      relatedPosts: {
        type: ['MarkdownRemark'],
        resolve: async (source, args, context, info) => {
          console.log("context.nodeModel:")
          console.dir(context.nodeModel)
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
    },
  }

  createResolvers(resolvers)
}