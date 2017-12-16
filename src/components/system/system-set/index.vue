<template>
  <div class="manage-set">
    <div class="title">
      <h2>菜品口味</h2>
      <small>+ 新增种类</small>
    </div>
    <tag style="margin-left:-20px" :sasteList="sasteList" @addTaste="addTaste" @delTaste="delTaste"></tag>
    <div class="title even">
      <h2>菜品种类</h2>
      <small>+ 新增种类</small>
    </div>
    <set-table :categoryList="categoryList" :loading="loading" @addPrd="addPrd"></set-table>
  </div>
</template>

<script>
import { Axios } from 'common/js/base'
import {
  GET_CATEGORY,
  GET_SASTE_LIST,
  ADD_TASTE,
  ADD_CATEGORY_CATE,
  DEL_TASTE
} from 'api/url'

import setTable from './set-table'
import Tag from './tag'
export default {
  data() {
    return {
      sasteList: [],
      categoryList: [],
      loading: true
    }
  },
  components: {
    setTable,
    Tag
  },
  methods: {
    // 添加菜品种类
    addPrd(productName) {
      Axios({
        url: ADD_CATEGORY_CATE,
        method: 'POST',
        data: {
          categoryName: productName
        }
      }).then(res => {
        if (res.data.code !== 0) {
          this.$message.error(res.data.msg)
          return
        }
        this._getCategoryList()
      })
    },
    // 添加菜品口味
    addTaste(taste) {
      Axios({
        url: ADD_TASTE,
        method: 'POST',
        data: {
          tasteName: taste
        }
      }).then(res => {
        if (res.data.code !== 0) {
          this.$message.error(res.data.msg)
          return
        }
        this._getTasteList()
      })
    },
    // 删除菜品口味
    delTaste(id) {
      Axios({
        url: DEL_TASTE,
        method: 'POST',
        data: {
          tasteId: id
        }
      }).then(res => {
        if (res.data.code !== 0) {
          this.$message.error(res.data.msg)
          return
        }
        this._getTasteList()
      })
    },
    // 获取菜品口味
    _getTasteList() {
      Axios({
        url: GET_SASTE_LIST,
        method: 'GET'
      }).then(res => {
        if (res.data.code !== 0) {
          this.$message.error(res.data.msg)
          return
        }
        this.sasteList = res.data.data.list.length ? res.data.data.list : []
      })
    },
    // 获取菜品种类
    _getCategoryList() {
      this.loading = true
      Axios({
        url: GET_CATEGORY,
        method: 'GET'
      }).then(res => {
        if (res.data.code !== 0) {
          this.$message.error(res.data.msg)
          return
        }
        this.categoryList = res.data.data.list.length ? res.data.data.list : []
        this.loading = false
      })
    }
  },
  created() {
    this._getTasteList()
    this._getCategoryList()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.manage-set
  padding 80px 60px
  background-color #fff
  .title
    display flex
    align-items baseline
    h2
      color $text-color
      font-size 18px
    small
      color #ff7200
      margin-left 10px
      font-size 14px
  .even
    margin-top 60px
</style>
