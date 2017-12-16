<template>
  <div class="entrance">
    <img src="~/assets/logo.png" alt="">
    <h1 class="system">
      蜜蜂点单后台管理系统
    </h1>
    <transition name="entrance">
      <router-view class="bar"/>
    </transition>
    <footer>
      Copyright © 2017-2018 蜜蜂易购粤ICP备17058898号-1
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.entrance
  min-width 1400px
  padding-top 30px
  height 100%
  min-height 1000px
  background-color $background-color
  box-sizing border-box
  position relative
  img
    display block
    margin auto
    height 140px
  .system
    font-size 30px
    color #130700
    margin-top 30px
    text-align center
  footer
    padding 30px 0
    font-size 14px
    position absolute
    bottom 0
    left 0
    right 0
    text-align center
    color $text-color
    text-align center
  .bar
    margin-top 50px
    position absolute
    left 50%
    box-shadow: 0 0 0 6px rgba(255,255,255,.4)
    transform translateX(-50%)
  .entrance-enter-active, .entrance-leave-active
    transition all 0.3s ease
  .entrance-enter
    opacity 0
  .entrance-leave-active
    opacity 0
</style>


