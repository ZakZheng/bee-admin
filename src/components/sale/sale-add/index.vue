<template>
  <div class="sale-add">
    <el-form ref="form" :model="form" label-width="230px" style="overflow: hidden">
      <el-col :span="10">
        <el-form-item label="活动名称：">
          <el-input v-model="form.name" placeholder="请输入活动名称" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker
            v-model="form.start_time"
            type="date"
            placeholder="选择开始时间"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="参与菜品：">
          <el-button type="primary" @click="openOption">请选择菜品</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="折扣幅度：">
          <el-input type="number" placeholder="请输入折扣幅度，精确到小数点后面两位"  v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            v-model="form.end_time"
            type="date"
            placeholder="选择结束时间"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="text" :rows="4" :maxlength="50" v-model="form.desc" placeholder="请输入备注（限50字）"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="title">
      <h2>已选可参与菜品</h2>
    </div>
    <popuo-option @optionSubmit="optionSubmit" :centerDialogVisible="centerDialogVisible"></popuo-option>

    <add-table :tableData="tableData" ></add-table>
    <pagination-bar class="table-bar"></pagination-bar>
    <div class="button-footer"> 
      <el-button type="primary" @click="onSubmit">完成并发布活动</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<style lang="stylus">
@import '~common/stylus/variable.styl'
.sale-add
  background-color #fff
  overflow hidden
  padding 20px 0
  box-shadow 2px 2px 5px 0px rgba(0, 0, 0, 0.05)
  .el-input__inner
    border-color #eee
  .style
    color #ff7200
    font-size 14px
    .style-main
      color $background-color
      font-size 16px
  .dishes
    float left
    .el-checkbox__inner
      width 17px
      height 17px
      &::after
        top 2px
        left 5px
        border-color #ff7200
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
      background-color transparent
      border-color #ff7200
    .el-checkbox__label
      color $text-color
  .el-input__prefix
    left inherit
    right 5px
    .el-input__icon
      font-size 20px
      color $text-color
  .el-form
    .el-form-item__label, .el-input__inner
      font-size 16px
  .title
    font-size 18px
    color $text-color
    margin 20px
    width 1230px
    margin 0 auto 20px
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
  .table-bar
    border 1px solid #eee
    overflow hidden
    width 1230px
    margin auto
    border-top 0
  .button-footer
    width 1230px
    margin 20px auto
    text-align center
    .el-button
      font-size 20px
      &+.el-button
        margin-left 20px
  .el-table::before
    height 100%
    width 1px
</style>

<script>
import addTable from './add-table'
import paginationBar from '@/components/pagination-bar/'
import tableData from 'data/manage-list'
import popuoOption from '@/components/popup-option/'

export default {
  data() {
    return {
      form: {
        name: '',
        region: [],
        start_time: '',
        end_time: ''
      },
      tableData: [],
      centerDialogVisible: false
    }
  },
  created() {
    this.tableData = tableData
  },
  components: {
    addTable,
    paginationBar,
    popuoOption
  },
  methods: {
    onSubmit() {
      console.log('onSubmit')
    },
    openOption() {
      this.centerDialogVisible = true
    },
    optionSubmit() {}
  }
}
</script>
