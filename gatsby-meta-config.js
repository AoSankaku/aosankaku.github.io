/**
 * @typedef {Object} Links
 * @prop {string} github Your github repository
 */

/**
 * @typedef {Object} MetaConfig
 * @prop {string} title Your website title
 * @prop {string} description Your website description
 * @prop {string} author Maybe your name
 * @prop {string} siteUrl Your website URL
 * @prop {string} lang Your website Language
 * @prop {string} utterances Github repository to store comments
 * @prop {Links} links
 * @prop {string} favicon Favicon Path
 */

/** @type {MetaConfig} */
const metaConfig = {
  title: "Blue Triangle's Homepage",
  description: `Blue Triangleのホームページです。プロフィール、趣味、作品などを紹介しています。`,
  author: "Blue Triangle",
  siteUrl: "https://aosankaku.github.io",
  lang: "ja",
  utterances: "AoSankaku/gatsby-starter-apple-comment",
  links: {
    github: "https://github.com/AoSankaku/aosankaku.github.io",
  },
  favicon: "src/images/icon.png",
}

// eslint-disable-next-line no-undef
module.exports = metaConfig
