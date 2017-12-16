<template>
  <div class="login">
    <h1 class="title">用户登录<span>UserLogin</span></h1>
    <el-form :model="formInline" class="demo-form-inline" status-icon :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input v-model="formInline.username" type="number" placeholder="用户名">
          <i slot="prefix" class="iconfont icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formInline.password" type="password" placeholder="密码">
          <i slot="prefix" class="iconfont icon-mima"></i>
        </el-input>
        <p class="link" @click="linkRouter('password')">忘记密码?</p>
      </el-form-item>
      <el-form-item class="VertifyCode-code" prop="VertifyCode">
        <el-input v-model="formInline.VertifyCode" :maxlength="4" placeholder="验证码">
          <i slot="prefix" class="iconfont icon-yanzhengma"></i>
        </el-input>
        <img :src="vertify_code" alt="">
        <span class="replace-image" ref="replace_image" @click="refur">看不清</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">登录</el-button>
        <el-button @click="linkRouter('register')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GET_CODE, LOGIN } from 'api/url'
import { phone, password } from 'common/js/reg'
import md5 from 'js-md5'
import { Axios } from 'common/js/base'

export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        if (!phone.test(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validateVertifyCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'))
      }
      setTimeout(() => {
        if (!value === '') {
          callback(new Error('验证码不能为空'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      }
      setTimeout(() => {
        if (!password.test(value)) {
          callback(new Error('密码最少需要6位'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      formInline: {
        username: '',
        password: '',
        VertifyCode: ''
      },
      vertify_code: GET_CODE,
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        VertifyCode: [{ validator: validateVertifyCode, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    linkRouter(url) {
      this.$router.push('/entrance/' + url)
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        } else {
          Axios({
            url: LOGIN,
            method: 'POST',
            data: {
              username: this.formInline.username,
              password: md5(this.formInline.password),
              vertifyCode: this.formInline.VertifyCode
            }
          }).then(res => {
            if (res.data.code === 0) {
              this.$router.push('/main/home')
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
              this.refur()
            }
          })
        }
      })
    },
    refur() {
      this.vertify_code = ''
      setTimeout(() => {
        this.vertify_code = GET_CODE
      }, 0)
    }
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'
@import '~common/stylus/input.styl'
.login
  background-color #ffffff
  width 600px
  margin auto
  border-radius 5px
  box-shadow 2px 2px 5px 0px rgba(0, 0, 0, 0.05)
  .title
    font-size 30px
    color $text-color
    padding-top 50px
    margin-left 70px
    span
      color #ccc
      font-size 20px
      padding-left 5px
  .el-form
    padding 50px 0
    width 360px
    margin auto
    .el-input
      width 360px
      margin auto
      line-height 40px
      position relative
      .el-input__inner
        border-radius 30px
        border-color #eee
        padding-left 70px
        color $text-color
        font-size 18px
      .el-input__prefix
        left 30px
    .link
      position absolute
      right 0
      top 0
      color #999
      font-size 16px
      transform translateX(100% + 10px)
    .VertifyCode-code
      position relative
      .el-form-item__content
        .el-input
          width 200px
      img
        width 100px
        position absolute
        top 50%
        margin-left 10px
        transform translateY(-50%)
      .replace-image
        color $background-color
        font-size 16px
        position absolute
        right 0
    .VertifyCode-code + .el-form-item
      margin-bottom 0
    .el-button
      border-radius 25px
      height 50px
      width 134px
      font-size 24px
      color $background-color
      border-color $background-color
      & + .el-button
        margin-left 20px
    .el-button--primary
      width 200px
      color #fff
</style>


