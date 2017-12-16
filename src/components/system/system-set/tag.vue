<template>
  <div class="tag">
    <el-tag
      v-for="(tag, index) in sasteList"
      :key="index"
      closable
      @close="delTaste(tag.taste_id, index)"
      type="info">
      {{tag.taste_name}}
    </el-tag>
    <el-col :span="24" style="margin-top: 20px">
      <el-input
        class="input-new-tag"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        placeholder="输入需要添加口味"
        >
      </el-input>
      <el-button type="primary" @click="addTaste" class="button-new-tag" size="small">
        确定
      </el-button>
    </el-col>
  </div>
  
</template>

<style lang="stylus">
@import '~common/stylus/variable.styl'
.tag
  overflow hidden
  .el-tag--info
    height auto
    padding 10px 15px
    background-color #fff
    min-width 120px
    font-size 18px
    color $text-color
    .el-tag__close
      float right
      top 5px
      font-size 24px
  .el-tag
    margin-left 20px
    margin-top 20px
  .button-new-tag
    margin-left 10px
    height 40px
    line-height 30px
    border-radius 5px
    font-size 16px
    padding 0 20px
  .input-new-tag
    vertical-align bottom
    width 280px
    margin-left 20px
  .el-input--small .el-input__inner
    line-height 40px
    height 40px
</style>

<script>
export default {
  props: {
    sasteList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    addTaste() {
      if (this.inputValue) {
        let flag = true
        this.sasteList.forEach(item => {
          if (item.taste_name === this.inputValue) {
            this.$message.warning('重复菜品名了')
            flag = false
          }
        })
        flag && this.$emit('addTaste', this.inputValue)
      }
    },
    delTaste(id, index) {
      this.$emit('delTaste', id)
    }
  }
}
</script>