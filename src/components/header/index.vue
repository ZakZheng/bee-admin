<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <img src="~/assets/mifeng.png" alt="">
      </div>
      <div class="tool">
        <div class="tool-header">
          <p class="member">会员有效期至:
            <span>2017/12/30</span>
            <span class="recharge cursor">
              <i class="iconfont icon-shouji"></i>
              充值
            </span>
          </p>
          <p class="welcome">
            您好,蜜蜂易购网络科技有限公司 
          </p>
          <div @click="exit" class="exit cursor" >
            <i class="iconfont icon-tuichu"></i>
            <span>退出登录</span>
          </div>
        </div>
        <div class="tool-router">
          <router-link class="item" to="/main/home">
            <i class="iconfont icon-caipin-"></i>
            <p>菜品管理</p>
          </router-link>
          <router-link class="item" to="/main/sale">
            <i class="iconfont icon-zhekoushuaishezhi"></i>
            <p>折扣活动</p>
          </router-link>
          <router-link class="item" to="/main/bill">
            <i class="iconfont icon-zhangdan"></i>
            <p>账单报表</p>
          </router-link>
          <router-link class="item" to="/main/system">
            <i class="iconfont icon-xitong"></i>
            <p>系统设置</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LOGOUT } from 'api/url'
import { Axios } from 'common/js/base'

export default {
  methods: {
    exit() {
      Axios({
        url: LOGOUT,
        method: 'GET'
      }).then(res => {
        if (res.data.code === 0) {
          this.$router.push('/')
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.header
  background-color $background-color
  .container
    width 1400px
    margin auto
    padding 10px 0
    display flex
    justify-content space-between
    align-items center
    .tool
      .tool-header
        display flex
        width 600px
        align-items baseline
        justify-content space-between
        &>p
          font-size 14px
          height 25px
          color black
        .member
          background-color rgba(255, 255, 255, 0.18)
          padding 0 10px
          border-radius 20px
          span + span
            margin-left 5px
          .recharge, .iconfont
            color #ff7200
        .exit
          .iconfont
            color black
      .tool-router
        display flex
        float right
        width 470px
        margin-top 20px
        justify-content space-between
        .item
          width 110px
          height 80px
          background-color rgba(255, 255, 255, 0.18)
          box-shadow 2px 2px 5px 0px rgba(0, 0, 0, 0.1)
          border-radius 4px
          display flex
          flex-direction column
          justify-content center
          text-align center
          &.router-link-active
            background-color #fff
        .iconfont
          color black
        p
          color black
          font-size 16px
          margin-top 10px
</style>