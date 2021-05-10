export default {
  render (h) {
    // 动态获取对应组件
    let component = null
    const route = this.$router.$options.routes.find(
      route => route.path === this.$router.current
    )
    if (route) component = route.component
    return h(component)
  }
}
