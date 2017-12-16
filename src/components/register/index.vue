<template>
  <div class="password">
    <h1 class="title">用户注册<span>Register</span></h1>
    <a class="back" @click="backRouter">返回登录>></a>
    <h2 class="title-secondary">立即注册成为用户,蜜蜂为你节省开支</h2>
    <strong class="sale">免费试用3天</strong>
    <el-form :model="formInline" class="demo-form-inline" status-icon :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input type="number" v-model="formInline.username" placeholder="手机号码" >
          <i slot="prefix" class="iconfont icon-shouji"></i>
          <template slot="append">
            <span @click="sendsmsCode" class="send">发送验证码</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="smsCode">
        <el-input v-model="formInline.smsCode" placeholder="短信验证码">
          <i slot="prefix" class="iconfont icon-yanzhengma"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="formInline.password" placeholder="登录密码">
          <i slot="prefix" class="iconfont icon-mima"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input type="password" v-model="formInline.confirmPassword" placeholder="确认登录密码">
          <i slot="prefix" class="iconfont icon-mima"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formInline.checked">我已阅读并同意</el-checkbox>
        <span class="more" @click="open">《蜜蜂点单用户使用协议》</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">立即注册并试用</el-button>
      </el-form-item>
    </el-form>
    <vertify-code @smsSubmit="smsSubmit" :centerDialogVisible="centerDialogVisible"></vertify-code>
  </div>
</template>

<script>
import GET_PROTOCOL from 'data/protocol.js'
import { REGISTER, GET_SMS_CODE } from 'api/url'
import axios from 'axios'
import vertifyCode from '@/components/vertify-code/'
import { phone, password } from 'common/js/reg'
// import Qs from 'qs'
import { Axios } from 'common/js/base'

export default {
  components: {
    vertifyCode
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      setTimeout(() => {
        if (!phone.test(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validateSmscode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('短信验证码不能为空'))
      }
      setTimeout(() => {
        if (!value === '') {
          callback(new Error('短信验证码不能为空'))
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
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      }
      setTimeout(() => {
        if (!password.test(value)) {
          return callback(new Error('密码最少需要6位'))
        } else if (value !== this.formInline.password) {
          callback(new Error('密码不相同'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      formInline: {
        username: '',
        password: '',
        confirmPassword: '',
        smsCode: '',
        checked: true,
        state: 1
      },
      centerDialogVisible: false,
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        smsCode: [{ validator: validateSmscode, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    backRouter() {
      this.$router.back()
    },
    smsSubmit(flag, value) {
      this.centerDialogVisible = false
      if (!flag) return
      axios
        .get(GET_SMS_CODE, {
          params: {
            vertifyCode: value,
            username: this.formInline.username,
            state: this.formInline.state
          }
        })
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code === 0 ? 'success' : 'error'
          })
        })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        } else {
          Axios({
            method: 'POST',
            url: REGISTER,
            data: {
              username: this.formInline.username,
              password: this.formInline.password,
              smsCode: this.formInline.smsCode
            }
          }).then(res => {
            if (res.data.code === 0) {
              this.$router.push('/')
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    },
    sendsmsCode() {
      if (!phone.test(this.formInline.username)) {
        this.$message({
          message: '请输入正确的手机号码',
          type: 'warning'
        })
      } else {
        this.centerDialogVisible = true
      }
    },
    open() {
      this.$alert(GET_PROTOCOL, '《蜜蜂点单用户使用协议》', {
        confirmButtonText: '确定',
        callback: action => {
          this.formInline.checked = true
        }
      })
    }
  }
}
</script>

<style lang="stylus" >
@import '~common/stylus/variable.styl'
@import '~common/stylus/input.styl'
.password
  background-color #ffffff
  width 600px
  margin auto
  border-radius 5px
  box-shadow 2px 2px 5px 0px rgba(0, 0, 0, 0.05)
  position relative
  .back
    position absolute
    right 20px
    top 20px
    color $text-color
  .title
    font-size 30px
    color $text-color
    padding-top 50px
    margin-left 70px
    span
      color #ccc
      font-size 20px
      padding-left 5px
  .title-secondary
    color #999999
    font-size 20px
    text-align center
    margin-top 30px
  .sale
    color $background-color
    font-size 20px
    text-align center
    display block
    margin-top 10px
  .el-form
    padding 30px 0
    width 360px
    margin auto
    position relative
    .send
      right 0
      top 0
      padding 0 20px
      background-color #EEEEEE
      border-radius 0 25px 25px 0
      position absolute
      color $text-color
      font-size 16px
    .el-form-item
      .el-input__suffix
        transform translateX(0) !important
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
      .el-checkbox__inner
        border-color #eeeeee
        width 20px
        height 20px
        &::after
          height 10px
          left 7px
      .el-checkbox__label
        color #999
        font-size 16px
      .el-checkbox__input.is-checked .el-checkbox__inner
        width 20px
        height 20px
        border-radius 5px
        &::after
          height 10px
          left 7px
      .el-checkbox__input.is-checked+.el-checkbox__label
        color #999
        font-size 16px
      .more
        color $background-color
      .smsCode-code + .el-form-item
        margin-bottom 0
      .el-button
        border-radius 25px
        height 50px
        width 100%
        font-size 24px
        color $background-color
        border-color $background-color
        & + .el-button
          margin-left 20px
      .el-button--primary
        background-color $background-color
        color #fff
</style>


