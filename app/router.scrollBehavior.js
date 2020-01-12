export default function(to, from, savedPos) {
  const isEqual = require('lodash/isEqual')
  let scrollTo = { x: 0, y: 0 }

  if (savedPos) {
    scrollTo = savedPos
  }

  if (from && to.name === from.name && isEqual(to.params, from.params)) {
    return
  }

  if (to.hash) {
    const strippedHash = to.hash.replace('#', '')
    const element = document.querySelector(
      `a[name="${strippedHash}"], a[id="${strippedHash}"]`
    )
    if (element) {
      scrollTo.y = element.getBoundingClientRect().top + window.pageYOffset
    }
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(scrollTo)
    }, 10)
  })
}
