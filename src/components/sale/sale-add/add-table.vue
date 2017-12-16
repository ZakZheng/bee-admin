<template>
  <el-table
    :data="tableData"
    stripe
    border
    header-row-class-name="header-row"
    @row-click="pitch"
    style="width: 1230px; margin: auto">
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
      prop="cover_image"
      label="菜品图片"
      width="122"
      align="center"
    >
      <template slot-scope="scope">
        <img :src="scope.row.cover_image">
      </template>
    </el-table-column>
    <el-table-column
      prop="product_name"
      label="菜品名称"
      width="200"
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
      width="142"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="shelves_state"
      label="菜品状态"
      width="80"
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
      width="130"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="product_id"
      label="可选操作"
      width="80"
      align="center"
    >
      <template slot-scope="scope">
        <div class="item-bar">
          <div class="style" @click="setManage(scope.row.product_id)">移除</div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    }
  },
  methods: {
    setManage(id) {
      this.$emit('setManage', id)
    },
    pitch(e) {
      e.radio = !e.radio
      console.log('setManage', e)
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
  text-align center
</style>
