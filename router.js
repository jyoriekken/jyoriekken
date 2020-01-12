import Vue from 'vue'
import Router from 'vue-router'

// Prevent double inclusion of router
if (!process.__vueRouterInstalled) {
  Vue.use(Router)
  process.__vueRouterInstalled = true
}

const Home = () => lazy(import('~/pages/index'))

let masterRoutesDefinition = [
  {
    path: '/',
    name: 'home',
    component: Home,
    alias: []
  }
]

function lazy(promise) {
  return promise.then(m => m.default || m)
}

function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'route-link-active',
    linkExactActiveClass: 'route-link-exact-active',
    fallback: false,
    scrollBehavior: require('~/app/router.scrollBehavior').default,
    routes: masterRoutesDefinition
  })
}

export { createRouter, masterRoutesDefinition }
