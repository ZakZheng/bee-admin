<template>
  <div class="sale-list">
    <el-form :model="formInline" class="form-inline" style="overflow: hidden">
      <el-col :span="7">
        <el-form-item label="活动名称：">
          <el-input v-model="formInline.name" placeholder="请输入活动名称" style="width:260px">
          </el-input>
        </el-form-item>
        <el-form-item label="开始时间：" style="margin-top: 20px" >
          <el-date-picker
            v-model="formInline.time"
            type="date"
            placeholder="选择日期"
            style="width:260px;" 
            >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="折扣范围：">
          <el-radio-group v-model="formInline.price">
            <el-radio-button label="0-2.99"></el-radio-button>
            <el-radio-button label="3.0-5.99"></el-radio-button>
            <el-radio-button label="6.0-8.99"></el-radio-button>
            <el-radio-button label="9.0-9.99"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="14" style="margin-top: 10px">
        <el-form-item label="结束时间：" style="float: left; width: 48%">
          <el-date-picker
            v-model="formInline.time"
            type="date"
            placeholder="选择日期"
            style="width:260px;" 
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动状态：" style="float: left; width: 48%">
          <el-select v-model="formInline.state" placeholder="请选择" style="width:260px;" >
            <el-option
              v-for="item in formInline.state_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-form-item class="search">
        <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
        <el-button class="reset" type="default" icon="iconfont icon-zhongzhi" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <list-table @setsale="setsale" :tableData="tableData" class="list-table" v-if="tableData.length"></list-table>
    <pagination-bar></pagination-bar>
  </div>
</template>

<script>
import listTable from './list-table'
import tableData from 'data/manage-list'
import paginationBar from '@/components/pagination-bar/'

export default {
  components: {
    listTable,
    paginationBar
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      formInline: {
        time: '',
        state: '1',
        state_options: [
          {
            value: '0',
            label: '已结束'
          },
          {
            value: '1',
            label: '进行中'
          }
        ],
        name: '',
        type_options: [
          {
            value: '0',
            label: '招牌菜'
          },
          {
            value: '1',
            label: '川菜'
          }
        ],
        price: '6.0-8.99'
      },
      tableData: [],
      check_all: false
    }
  },
  methods: {
    setsale(id) {
      console.log(id)
    }
  },
  created() {
    this.tableData = tableData
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'
.sale-list
  .el-form
    box-sizing border-box
    padding 10px 0 10px 30px
    background-color #fff
    position relative
    box-shadow 2px 2px 5px 0px rgba(0, 0, 0, 0.05)
    .el-input__prefix
      right 5px
      left inherit
    .el-form-item
      margin 5px
      &.search
        position absolute
        right 16px
        margin 0
        top 20px
        .el-form-item__content
          display flex
        .el-button--primary
          height 80px
          width 80px
          box-shadow 1px 1px 5px 0px rgba(0, 0, 0, 0.1)
          display flex
          flex-direction column
          justify-content space-between
          align-items center
          padding 16px
          .el-icon-search
            font-size 20px
          span
            font-size 16px
        .reset
          background-color #f5f5f5
          border 0
          width 80px
          height 80px
          background-color #f5f5f5
          box-shadow 1px 1px 5px 0px rgba(0, 0, 0, 0.1)
          color #333
          border-radius 4px
          display flex
          flex-direction column
          justify-content space-between
          align-items center
          padding 16px
          .iconfont
            font-size 24px
          span
            font-size 16px
    .el-radio-button:first-child .el-radio-button__inner
      border-left 0
    .el-radio-button
      background-color transparent
      .el-radio-button__orig-radio:checked+.el-radio-button__inner
        background-color $background-color
        box-shadow inherit
    .el-input__inner
      border-color #eee
    .el-form-item__label, .el-input__inner
      font-size 16px
    .el-select .el-input .el-select__caret
      color $text-color
      font-size 24px
  .list-table
    margin-top 10px
    box-shadow 2px 2px 5px 0px rgba(0, 0, 0, 0.05)
    .cell
      color #666
      font-size 14px
      padding 0 10px
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
    background-color $background-color
    border-color $background-color
  .el-checkbox__input.is-checked+.el-checkbox__label
    color #999
    font-size 16px
  .el-table--border td, .el-table--border th
    border-color #eee
  .el-checkbox__inner
    border-radius 15px
    width 17px
    height 17px
  .el-checkbox__inner::after
    left 5px
    top 2px
  .pagination-bar
    box-shadow 2px 2px 5px 0px rgba(0, 0, 0, 0.05)
</style>
