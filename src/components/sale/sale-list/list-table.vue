<template>
  <el-table
    :data="tableData"
    stripe
    border
    header-row-class-name="header-row"
    @row-click="pitch"
    style="width: 100%">
    <el-table-column
      prop="number"
      label="序号"
      width="80"
      align="center"
    >
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.radio">{{scope.row.number}}</el-checkbox>
      </template>
    </el-table-column>
    <el-table-column
      prop="product_name"
      label="活动名称"
      align="center"
    >
      <template slot-scope="scope">
        <span class="style">{{scope.row.product_name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="inventory"
      label="折扣"
      width="120"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="update_time"
      label="开始时间"
      width="170"
      align="center"
    >
      <template slot-scope="scope">
        <span style="color: #999">{{Format(scope.row.update_time)}}</span>
      </template>
    </el-table-column>
        <el-table-column
      prop="update_time"
      label="结束时间"
      width="170"
      align="center"
    >
      <template slot-scope="scope">
        <span style="color: #999">{{Format(scope.row.update_time)}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="category_name"
      label="支持菜品"
      width="130"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="shelves_state"
      label="活动状态"
      width="140"
      align="center"
    >
      <template slot-scope="scope">
        <span class="style-main" v-if="scope.row.shelves_state">进行中</span>
        <span style="color: #999;" v-else>待开始</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="description"
      label="备注"
      width="226"
      align="center"
    >
      <template slot-scope="scope">
        <span style="color: #999">{{scope.row.description}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="product_id"
      label="可选操作"
      width="100"
      align="center"
    >
      <template slot-scope="scope">
        <div class="item-bar">
          <div class="style" @click="setSale(scope.row.product_id)">编辑</div>
          <div class="style" @click="setSale(scope.row.product_id)">删除</div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { Format } from 'common/js/base'

export default {
  props: {
    tableData: {
      type: Array,
      default: []
    }
  },
  watch: {
    tableData(val) {
      val.update_time = Format(val)
      console.log(Format(val))
    }
  },
  methods: {
    Format(val) {
      return Format(val)
    },
    setSale(id) {
      this.$emit('setSale', id)
    },
    pitch(e) {
      e.radio = !e.radio
      console.log('setSale', e)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.style
  color #ff7200
  font-size 14px
.style-main
  color $background-color
  font-size 14px
.item-bar
  display flex
  justify-content space-between
</style>
