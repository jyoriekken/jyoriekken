export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'SMOL GUMBALL',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'smol but good'
      }
    ],
    script: [{ src: 'https://emoji-exploder.netlify.com/dist/index.js' }],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://emoji-exploder.netlify.com/dist/index.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css?family=Lato:400,900&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['~/modules/custom-router'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
