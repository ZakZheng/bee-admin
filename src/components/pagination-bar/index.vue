<template>
  <div class="pagination-bar">
    <div class="pagination-left">
      <el-checkbox v-model="check_all">全选</el-checkbox>
      <el-button @click="delAll" type="info">删除</el-button>
    </div>
    <div class="block">
      <el-pagination
        @current-change="pageChange"
        :page-size="ptotal"
        prev-text="上一页"
        next-text="下一页"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<style lang="stylus" >
@import '~common/stylus/variable.styl'
.pagination-bar
  margin-top 10px
  background-color #fff
  box-sizing border-box
  display flex
  justify-content space-between
  align-items center
  padding 10px 24px
  .el-button--info
    background-color #f5f5f5
    border-color #eee
    color $text-color
    margin-left 20px
    padding 10px 20px
    border-radius 4px
  .el-pagination__total::after
    content '记录'
  li.el-icon.more.el-icon-more
    display none
  li.number
    display none
    &.active
      display inline
      color $text-color
      &::before
        content ' 第 '
        color $text-color
      &::after
        content ' /'
        color $text-color
    &:last-child
      display inline
      &::after
        content ' 页 '
        color $text-color
  button, .btn-prev, .btn-next
    background-color #f5f5f5
    border-color #eee
    color $text-color
    padding 0 10px
    border-radius 4px
    border 1px solid #eee
    -webkit-appearance none
    text-align center
    -webkit-box-sizing border-box
    box-sizing border-box
    outline 0
    margin 0
    -webkit-transition 0.1s
    transition 0.1s
    font-weight 500
    font-size 17px
.el-pagination button:hover
  color inherit
</style>

<script>
export default {
  props: {
    ptotal: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      check_all: false
    }
  },
  watch: {
    check_all(flag) {
      this.$emit('listTable', flag)
    }
  },
  methods: {
    pageChange(currentPage) {
      this.$emit('pageChange', currentPage)
    },
    delAll() {
      this.$emit('delAll')
    }
  }
}
</script>
