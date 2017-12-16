<template>
  <el-table
    :data="list_data"
    v-loading="loading"
    stripe
    border
    header-row-class-name="header-row"
    @row-click="pitch"
    style="width: 100%">
    <el-table-column
      prop="order"
      label="序号"
      width="80"
      align="center"
    >
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.radio">{{scope.row.order}}</el-checkbox>
      </template>
    </el-table-column>
    <el-table-column
      prop="image_url"
      label="菜品图片"
      width="122"
      align="center"
    >
      <template slot-scope="scope">
        <img v-lazy="scope.row.image_url" style="width: 100%"/>
      </template>
    </el-table-column>
    <el-table-column
      prop="product_name"
      label="菜品名称"
      width="120"
      align="center"
    >
      <template slot-scope="scope">
        <span class="style">{{scope.row.product_name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="description"
      label="菜品描述"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="category_name"
      label="菜品种类"
      width="114"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="taste_list"
      label="可选口味"
      width="100"
      align="center"
    >
      <template slot-scope="scope">
        <span v-if="scope.row.taste_list && scope.row.taste_list.length" v-for="(item, index) in scope.row.taste_list" :key="index">{{item.taste_name}}、</span>
      </template>
        
    </el-table-column>
    <el-table-column
      prop="shelves_state"
      label="菜品状态"
      width="115"
      align="center"
    >
      <template slot-scope="scope">
        <span class="style-main" v-if="scope.row.shelves_state">已上架</span>
        <span style="color: #999;" v-else>未上架</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="inventory"
      label="每日可出品数量"
      width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="80"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="update_time"
      label="添加\修改日期"
      width="130"
      align="center"
    >
      <template slot-scope="scope">
        <span style="color: #999">{{Format(scope.row.update_time)}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="product_id"
      label="可选操作"
      width="120"
      align="center"
      type=index
    >
      <template slot-scope="scope">
        <div class="item-bar">
          <div class="style cursor" @click.stop="edit(scope.row.product_id)">编辑</div>
          <div class="style cursor" @click.capture.stop="changeShelState(scope.row.product_id, scope.row.shelves_state,scope.$index)">{{ scope.row.shelves_state ? '下架' : '上架' }}</div>
          <div class="style cursor" @click.stop="delPrd(scope.row.product_id)">删除</div>
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
      list_data: []
    }
  },
  watch: {
    tableData(val) {
      let arr = val.slice()
      arr.forEach((item, index) => {
        let order = index + 1 + (this.page - 1) * this.ptotal
        this.$set(item, 'radio', false)
        this.$set(item, 'order', order)
      })
      this.list_data = arr
    }
  },
  methods: {
    Format(val) {
      return Format(val)
    },
    edit(id) {
      this.$emit('edit', id)
    },
    allPitch(flag) {
      this.list_data.forEach((item, index) => {
        item.radio = flag
      })
    },
    pitch(e) {
      e.radio = !e.radio
    },
    delPrd(...arrItem) {
      this.$emit('delPrd', ...arrItem)
    },
    delAll() {
      let delArr = []
      this.list_data.forEach(item => {
        if (item.radio === true) {
          delArr.push(item.product_id)
        }
      })
      return delArr
    },
    changeShelState(id, state, index) {
      this.$emit('changeShelState', id, state)
      this.list_data[index].shelves_state = state ? 0 : 1
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
