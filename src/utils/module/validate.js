/*
* @param {string} path
* @returns {Boolean}
*/
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/*
* @param {string} str
* @returns {Boolean}
*/
function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export {
  isExternal,
  validUsername
}
