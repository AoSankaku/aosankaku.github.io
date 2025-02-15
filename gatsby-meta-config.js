/**
 * @typedef {Object} Links
 * @prop {string} github Your github repository
 */

/**
 * @typedef {Object} Social
 * @prop {string} social
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
 * @prop {Social} social
 * @prop {string} favicon Favicon Path
 */

/** @type {MetaConfig} */
const metaConfig = {
  title: "Blue Triangle's Website",
  description: `Blue Triangleのサイトです。プロフィール、趣味、作品などを紹介しています。MinecraftやGatsbyのことを主に扱っています。`,
  author: "Blue Triangle",
  siteUrl: "https://aosankaku.net",
  lang: "ja",
  utterances: "AoSankaku/gatsby-starter-apple-comment",
  links: {
    github: "https://github.com/AoSankaku/aosankaku.github.io",
  },
  social: {
    misskeySystems: "ao_sankaku@misskey.systems",
    twitter: "@ao_sankaku"
  },
  favicon: "src/images/icon.png",
}

// eslint-disable-next-line no-undef
module.exports = metaConfig
