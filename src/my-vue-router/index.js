import Link from './krouter-link'
import RouterView from './krouter-view'

let Vue
class VueRouter {
  constructor (options) {
    this.$options = options

    // 定义响应式的属性current
    const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'current', initial)

    // 监听hashChange
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }

  onHashChange () {
    this.current = window.location.hash.slice(1)
  }
}

VueRouter.install = function (_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  Vue.component('router-link', Link)
  Vue.component('router-view', RouterView)
}

export default VueRouter
