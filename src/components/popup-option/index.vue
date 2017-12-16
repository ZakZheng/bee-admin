<template>
  <el-dialog
    :visible.sync="VisibleFlag"
    width="400px"
    :append-to-body	="true"
    @close="onSubmit(false)"
    center>
    <div slot="title" class="title">
      <h1>验证码</h1>
      <small>Veritication Code</small>
    </div>
    <div class="img-bar">
      <img @click="refur" :src="vertify_code" style="width:165px">
      <i class="iconfont icon-refresh" @click="refur" ></i>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-input v-model="input" placeholder="请输入验证码"></el-input>
      <el-button type="primary" @click="onSubmit(true, input)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { GET_CODE } from 'api/url'
export default {
  data() {
    return {
      optionData: '',
      vertify_code: GET_CODE,
      VisibleFlag: false
    }
  },
  watch: {
    VisibleFlag(val) {
      if (val) {
        this.vertify_code = GET_CODE
      } else {
        this.vertify_code = ''
      }
    },
    centerDialogVisible(val) {
      this.VisibleFlag = val
    }
  },
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    refur() {
      this.vertify_code = ''
      setTimeout(() => {
        this.vertify_code = GET_CODE
      }, 0)
    },
    onSubmit(flag, optionData) {
      this.$emit('optionSubmit', flag, optionData)
    }
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'
.el-dialog--center .el-dialog__header
  background-color $background-color
  padding 0
  .title
    text-align left
    padding 39px 20px 36px
    h1
      font-size 26px
    small
      font-size 14px
      margin-top 5px
      display block
  .el-dialog__headerbtn .el-dialog__close
    font-size 24px
    color #fff
  .el-dialog__headerbtn
    top 10px
    right 10px
.img-bar
  width 194px
  margin auto
  display flex
  justify-content space-between
  align-items center
.dialog-footer
  border-radius 5px
  border 1px solid #eee
  display flex
  width 194px
  box-sizing border-box
  margin auto
  justify-content space-between
  .el-input__inner
    border-radius 5px 0 0 5px
    border 0
    line-height 40px
  .el-button
    border-radius 0 5px 5px 0
    border 0
    font-size 16px
.el-dialog--center .el-dialog__body
  padding 30px 0 18px
</style>
