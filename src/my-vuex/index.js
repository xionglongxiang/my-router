let Vue
class Store {
  constructor (options = {}) {
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })
    // 保存⽤户编写的actions选项
    this._actions = options.actions || {}
    // 绑定commit上下⽂否则action中调⽤commit时可能出问题!!
    // 同时也把action绑了，因为action可以互调
    const store = this
    const { commit, actions } = store
    this.commit = function boundCommit (type, payload) {
      commit.call(store, type, payload)
    }
    this.actions = function boundActions (type, payload) {
      return actions.call(store, type, payload)
    }
    const computed = {}
    this.getters = {}
    this._wrappedGetters = options.getters
    Object.keys(this._wrappedGetters).forEach(key => {
      const fn = store._wrappedGetters[key]
      computed[key] = function () {
        return fn(store.state)
      }
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })
  }

  get state () {
    return this._vm._data.$$state
  }

  set state (v) {
    console.error('please use replaceState to reset state!')
  }

  commit (type, payload) {
    // 获取type对应的mutation
    const entry = this._mutations[type]
    if (!entry) {
      console.error(`unknown mutation type: ${type}`)
      return
    }
    // 指定上下⽂为Store实例
    // 传递state给mutation
    entry(this.state, payload)
  }

  dispatch (type, payload) {
    // 获取⽤户编写的type对应的action
    const entry = this._actions[type]
    if (!entry) {
      console.error(`unknown action type: ${type}`)
      return
    }
    // 异步结果处理常常需要返回Promise
    return entry(this, payload)
  }
}

function install (_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export const mapGetters = array => {
  console.log(array)
  const res = []
  for (const item of array) {
    res[item] = () => {}
  }
  return res
}

export default {
  Store,
  install
}
