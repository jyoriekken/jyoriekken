export default async function CustomRouter() {
  const path = require('path')
  const { masterRoutesDefinition } = require('../../router')

  // Communicate all static routes (not :param or *wildcard based) to Nuxt as baseline routes.
  // This allows the sibling sitemap Nuxt module to manage them via `exclude` / `include` options
  this.nuxt.options.build.createRoutes = () =>
    getStaticRoutes(masterRoutesDefinition)

  // Add `router.js` from repo root where auto-generated Nuxt `router.js` would exist
  this.addTemplate({
    fileName: 'router.js',
    src: path.resolve(`${this.options.srcDir}`, 'router.js')
  })

  /**
   * Plucks static routes from and flattens down any nested route definitions
   * @param {Array<Object>} masterRoutesDefinition Array of standard vue-router route definitions
   * @returns {Array<String>} Flat array of strings expressing all static routes on the site
   */
  function getStaticRoutes(masterRoutesDefinition) {
    // Get all static routes and ignore dynamic routes
    return flattenRoutes(masterRoutesDefinition).filter(
      ({ url }) => !url.includes(':') && !url.includes('*')
    )

    function flattenRoutes(routesDef, path = '', totalRoutes = []) {
      routesDef.forEach(route => {
        if (route.children) {
          flattenRoutes(route.children, path + route.path + '/', totalRoutes)
        }
        if (route.path !== '') {
          totalRoutes.push({
            ...route,
            url: path + route.path
          })
        }
      })
      return totalRoutes
    }
  }
}
