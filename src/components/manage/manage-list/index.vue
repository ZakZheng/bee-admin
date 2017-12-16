<template>
  <div class="manage-list">
    <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
      <el-form-item label="编辑日期：">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="菜品状态：">
        <el-select v-model="formInline.shelvesState" placeholder="请选择">
          <el-option
            v-for="item in state_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜品种类：">
        <el-select v-model="formInline.type" placeholder="请选择">
          <el-option
            v-for="item in type_options"
            :key="item.category_id"
            :label="item.category_name"
            :value="item.category_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格范围：">
        <el-radio-group v-model="formInline.price">
          <el-radio-button label="0-19"></el-radio-button>
          <el-radio-button label="20-69"></el-radio-button>
          <el-radio-button label="70-99"></el-radio-button>
          <el-radio-button label="100-199"></el-radio-button>
          <el-radio-button label="200以上"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="search">
        <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
        <el-button class="reset" type="default" icon="iconfont icon-zhongzhi" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <list-table class="list-table" 
                @edit="edit" 
                @delPrd="delPrd"
                @changeShelState="changeShelState"
                :tableData="tableData" 
                ref="list_table"
                :ptotal="pagination.ptotal"
                :page="pagination.page"
                :loading="loading"
                >
    </list-table>
    <pagination-bar :total="pagination.total" 
                    :ptotal="pagination.ptotal" 
                    :page="pagination.page"
                    @listTable="listTable" 
                    @pageChange="pageChange"
                    @delAll="delAll"
    ></pagination-bar>
  </div>
</template>

<script>
import { Axios } from 'common/js/base'
import { mapMutations } from 'vuex'
import {
  GET_PRODUCT_LIST,
  GET_CATEGORY,
  DEL_PRD,
  PRODUCT_CHANGESHELSTATE
} from 'api/url'
import listTable from './list-table'
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
      pagination: {
        total: 0,
        ptotal: 10,
        page: 1
      },
      formInline: {
        time: '',
        beginTime: '',
        endTime: '',
        shelvesState: '',
        type: '',
        price: '',
        minPrice: '',
        maxPrice: ''
      },
      tableData: [],
      loading: true,
      check_all: false,
      state_options: [
        {
          value: 0,
          label: '未上架'
        },
        {
          value: 1,
          label: '已上架'
        }
      ],
      type_options: []
    }
  },
  watch: {
    'formInline.price'(val) {
      let str = val
      let search_ = str.indexOf('-')
      let searchStr = str.indexOf('以上')
      let min = 0
      let max = 0
      if (search_ !== -1) {
        min = str.substring(0, search_)
        max = str.substring(search_ + 1)
      } else {
        min = str.substring(0, searchStr)
        max = ''
      }
      this.formInline.minPrice = min
      this.formInline.maxPrice = max
    },
    'formInline.time'(val) {
      this.formInline.beginTime =
        val[0] instanceof Date ? val[0].getTime() / 1000 : ''
      this.formInline.endTime =
        val[0] instanceof Date ? val[1].getTime() / 1000 : ''
    }
  },
  methods: {
    ...mapMutations(['SET_PRODUCT_ID']),
    edit(id) {
      this.SET_PRODUCT_ID(id)
      this.$router.push(`/main/home/edit/${id}`)
    },
    // 搜索
    searchData() {
      this._getTableData()
    },
    // 分页
    pageChange(page) {
      this.pagination.page = page
      this._getTableData()
    },
    // 重置表单
    resetForm() {
      this.formInline.time = ''
      this.formInline.shelvesState = ''
      this.formInline.type = ''
      this.formInline.price = ''
      this.formInline.minPrice = ''
      this.formInline.maxPrice = ''
    },
    listTable(flag) {
      this.$refs.list_table.allPitch(flag)
    },
    // 删除
    delPrd(...arr) {
      let newArr = [...arr].slice()
      Axios({
        url: DEL_PRD,
        method: 'POST',
        data: {
          productIds: newArr
        }
      }).then(res => {
        if (res.data.code === 0) {
          this._getTableData()
        } else {
          this.$message({
            message: res.data.msg,
            type: res.data.code === 0 ? 'success' : 'error'
          })
        }
      })
    },
    // 上下架
    changeShelState(id, state) {
      Axios({
        url: PRODUCT_CHANGESHELSTATE,
        method: 'POST',
        data: {
          productId: id,
          shelvesState: state ? 0 : 1
        }
      }).then(res => {
        if (res.data.code !== 0) {
          this.$message({
            message: res.data.msg,
            type: res.data.code === 0 ? 'success' : 'error'
          })
        }
      })
    },
    // 删除全部
    delAll() {
      let delArr = this.$refs.list_table.delAll()
      this.delPrd(...delArr)
    },
    // 获取分类
    _getCategoryData() {
      Axios({
        url: GET_CATEGORY,
        method: 'GET'
      }).then(res => {
        if (res.data.code === 0 && res.data.data.list.length) {
          this.type_options = res.data.data.list
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    // 获取数据列表
    _getTableData() {
      this.loading = true
      Axios({
        url: GET_PRODUCT_LIST,
        method: 'GET',
        data: {
          page: this.pagination.page,
          beginTime: this.formInline.beginTime || '',
          endTime: this.formInline.endTime || '',
          categoryId: this.formInline.type || '',
          shelvesState: this.formInline.shelvesState,
          minPrice: this.formInline.minPrice,
          maxPrice: this.formInline.maxPrice
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.data.list
          this.pagination = {
            page: res.data.data.page,
            total: res.data.data.total
          }
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
        this.loading = false
      })
    }
  },
  created() {
    this._getTableData()
    this._getCategoryData()
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'
.manage-list
  .pagination-left
    .el-button:focus, .el-button:hover
      color $text-color
  .el-button:focus, .el-button:hover
    color #fff
  .el-button--info:hover
    color $text-color
  .el-form
    box-sizing border-box
    padding 20px 30px
    background-color #fff
    position relative
    box-shadow 2px 2px 5px 0px rgba(0, 0, 0, 0.05)
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
  .el-checkbox__label
    font-size 16px
    color #999
</style>
