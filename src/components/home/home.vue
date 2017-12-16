<template>
  <div class="home">
     <div class="manage-type">
       <router-link class="item" to="/main/home/manage-list">
        菜品管理
       </router-link>
       <router-link class="item" to="/main/home/manage-add">
        新增菜品
       </router-link>
       <router-link class="item" to="/main/home/manage-set">
        菜品设置
       </router-link>
     </div>
     <div class="bar">
      <router-view></router-view>
     </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
 
.manage-type
  display flex
  .item
    &+.item
      margin-left 15px
    font-size 17px
    color $text-color
    padding 15px 25px
    background-color #ffedc4
    border-radius 5px 5px 0 0
    &.router-link-active
      background-color #ff7200
      color #fff
.bar
  background-color #f5f5f5
  padding 10px
</style>


