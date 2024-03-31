//import tagAliases from "./tagAliases"
const tagAliases = require("./tagAliases")
const _ = require("lodash")

const normalizeTagName = (name) => {
  //const passReg = /[0-9a-z\-]+/
  const semiPassReg = /[0-9a-zA-Z\-\s]+/

  const target = tagAliases.names.find(e => e.original === name)

  if (typeof target !== "undefined") return _.kebabCase(target.normalized)

  //if (name.match(passReg)?.join('') === name) return name

  if (name.match(semiPassReg)?.join('') === name) return _.kebabCase(name)

  throw new SyntaxError(
    `The tag name "${name}" is neither be able to be transformed nor defined in tagAliases.js`
  )
}

//export default normalizeTagName

module.exports = normalizeTagName