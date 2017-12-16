<template>
  <div id="app" ref="app">
    <router-view/>
  </div>
</template>

<script>
require('common/font/iconfont.css')

export default {
  mounted() {
    this.$nextTick(() => {
      if (
        window.document.documentElement.clientHeight >
        this.$refs.app.clientHeight
      ) {
        window.document.documentElement.style.height = '100%'
        window.document.body.style.height = '100%'
        this.$refs.app.style.height = '100%'
      }
    })
  }
}
</script>

<style lang="stylus">
body
  min-width 1400px
html, body, #app
  min-height 100%
*
  padding 0
  margin 0
a
  text-decoration none
  color $text-color
</style>
