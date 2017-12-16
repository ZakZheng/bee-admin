<template>
  <div class="set-table">
    <el-table
      :data="list_data"
      border
      stripe
      header-row-class-name="header-row"
      style="width: 100%;margin-top: 20px"
      v-loading="loading"
      >
      <el-table-column
        prop="order"
        label="序号"
        align="center"
        width="160">
      </el-table-column>
      <el-table-column
        prop="category_name"
        align="center"
        label="种类名称"
      >
        <template slot-scope="scope">
          <span class="style">{{scope.row.category_name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="prd_count"
        label="产品数量"
        align="center"
        width="300">
      </el-table-column>
      <el-table-column
        label="可选操作"
        align="center"
        width="284">
        <template slot-scope="scope">
          <div class="layout">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, typeData)"
              type="primary"
              size="small">
              上移
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, typeData)"
              type="info"
              size="small">
              下移
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, typeData)"
              type="info"
              size="small">
              禁用
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" style="padding: 20px 0; text-align: center; border:1px solid #eee; border-top: 0;">
        <el-input
          class="input-new-tag"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          placeholder="输入需要添加菜品种类"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm">
        </el-input>
        <el-button type="primary" @click="addPrd" class="button-new-tag" size="small">
          确定
        </el-button>
      </el-col>
  </div>
</template>

<style lang="stylus">
.set-table
  padding-bottom 40px
  .el-table::before
    height 100%
    width 1px
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
  .style
    color #ff7200
    font-size 16px
      .style-main
        color $background-color
        font-size 16px
  .cell
    .el-button--primary
      color #ff7200
      background-color transparent
      border-color transparent
  .el-button--info
    color #999
    background-color transparent
    border-color transparent
  .layout
    display flex
    padding 0 40px
    justify-content space-between
  .el-button+.el-button
    margin 0
</style>


<script>
export default {
  props: {
    categoryList: {
      type: Array,
      default: []
    },
    page: {
      type: Number,
      default: 1
    },
    ptotal: {
      type: Number,
      default: 10
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inputValue: '',
      list_data: []
    }
  },
  watch: {
    categoryList(val) {
      let arr = val.slice()
      arr.forEach((item, index) => {
        let order = index + 1 + (this.page - 1) * this.ptotal
        this.$set(item, 'order', order)
      })
      this.list_data = arr
    }
  },
  methods: {
    addPrd() {
      if (this.inputValue) {
        this.$emit('addPrd', this.inputValue)
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    handleInputConfirm() {
      console.log('handleInputConfirm')
    }
  }
}
</script>