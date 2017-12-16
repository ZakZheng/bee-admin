<template>
  <div class="manage-add">
    <el-form ref="form" :model="form" label-width="230px">
      <el-col :span="12">
        <el-form-item label="菜品名称：">
          <el-input v-model="form.productName" placeholder="请选择菜品名称" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="菜品种类：">
          <el-select v-model="form.categoryId" placeholder="请选择菜品种类" style="width: 80%">
            <el-option :label="item.category_name" :value="item.category_id" :key="index" v-for="(item, index) in categoryList"></el-option>
          </el-select>
          <span class="style" @click="addType">+ 新增种类</span>
        </el-form-item>
        <el-form-item label="是否店长推荐：">
          <el-select v-model="form.recommended" placeholder="请选择是否店长推荐"  style="width: 80%">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品价格：">
          <el-input type="number" v-model="form.price" placeholder="请输入菜品价格" style="width: 50%"></el-input>
          <span style="padding-left: 10px">元</span>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="每日可出品数量：">
          <el-input type="number" v-model="form.inventory"></el-input>
        </el-form-item>
        <el-form-item label="菜品描述：">
          <el-input type="textarea" :rows="4" :maxlength="50" v-model="form.description" placeholder="请输入菜品描述（限50字）"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="22">  
        <el-form-item label="支持口味">
          <el-checkbox-group v-model="form.tasteIds" class="dishes">
            <el-checkbox name="type" :label="item.taste_id" :key="index" v-for="(item, index) in sasteList">{{item.taste_name}}</el-checkbox>
          </el-checkbox-group>
          <span class="style" @click="addDishes" style="margin-left: 20px">+ 新增口味</span>
        </el-form-item>
      </el-col>
      <el-col :span="11">  
        <el-form-item label="菜品图片：" class="img">
          <el-upload
            action=""
            list-type="picture-card"
            ref="upload"
            :limit="1"
            :auto-upload="false"
            :http-request="subImg"
            :on-change="onChange"
            :file-list = "imgList"
            :before-upload="beforeAvatarUpload"
            v-show="!option.imgUrl"
            >
            <i class="iconfont icon-picture"></i>
            <div class="el-upload__text">选择图片</div>
            <div slot="tip" class="el-upload__tip" style="color: #999">
              <p>图片仅支持png、jpeg格式</p>
              <p>图片大小不超过3M</p>
              <p>图片尺寸520*316</p>
            </div>
          </el-upload>
          <el-dialog :visible.sync="form.dialogVisible" size="tiny">
            <img width="100%" :src="form.coverImage" alt="">
          </el-dialog>
          <div class="cropImg" v-if="option.imgUrl">
            <vue-cropper
              ref="cropper"
              :img="option.imgUrl"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="option.info"
              :autoCrop="true"
              :autoCropWidth="520"
              :autoCropHeight="316"
              :fixedBox="true"
              :canScale="true"
            ></vue-cropper>
            <el-button type="primary" @click="finish()" v-if="!reselectFlag">确定上传</el-button>
            <el-button @click="clearImg" v-if="!reselectFlag">重新选择</el-button>
          </div>
          <div class="reselect" v-if="reselectFlag">
            <el-button @click="clearImg">重新选择</el-button>
            <p>图片仅支持png、jpeg格式，图片大小不超过3M，图片尺寸520*316</p>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="22" class="button-footer" v-show="submitFlag"> 
        <el-form-item>
          <el-button type="primary" @click="onSubmit(1)">完成并上架</el-button>
          <el-button @click="onSubmit(0)">完成暂不上架</el-button>
          <el-button>放弃编辑</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
import { Axios, convertBase64UrlToBlob } from 'common/js/base'
import VueCropper from 'vue-cropper'
import axios from 'axios'
import {
  ADD_PRODUCT_PPRO,
  GET_CATEGORY,
  GET_SASTE_LIST,
  UPLOAD_IMAGE
} from 'api/url'

export default {
  data() {
    return {
      form: {
        coverImage: '',
        categoryId: '',
        tasteIds: [],
        productName: '',
        inventory: '',
        description: '',
        recommended: '',
        price: ''
      },
      option: {
        imgUrl: '',
        size: 1,
        outputType: 'jpeg',
        info: false
      },
      imgList: [],
      imgFile: {},
      sasteList: [],
      categoryList: [],
      reselectFlag: false,
      submitFlag: true
    }
  },
  components: {
    VueCropper
  },
  methods: {
    onChange(file) {
      this.option.imgUrl = file.url
      this.submitFlag = false
    },
    finish(type) {
      let cropperBox = document.querySelector('.cropper-crop-box')
      this.$refs.cropper.getCropData(data => {
        this.imgFile = data
        this.subImg(this.imgFile, res => {
          if (res.data.code === 0) {
            this.form.coverImage = res.data.data.imageId
            this.reselectFlag = true
            this.submitFlag = true
            cropperBox.style.display = 'block'
          }
        })
      })
    },
    // 重新选择
    clearImg() {
      this.$refs.upload.clearFiles()
      this.option.imgUrl = ''
      this.form.coverImage = ''
      this.reselectFlag = false
      this.imgFile = {}
      this.submitFlag = true
    },
    onSubmit(shelvesState) {
      this._subForm(shelvesState)
    },
    addType() {
      this.$router.push('/main/home/manage-set')
      console.log(1)
    },
    addDishes() {
      this.$router.push('/main/home/manage-set')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isJPG && !isPNG) {
        this.$message.error('图片仅支持png，jpeg格式!')
      }
      if (!isLt3M) {
        this.$message.error('图片大小不能超过 3MB!')
      }
      return (isJPG || isPNG) && isLt3M
    },
    subImg(file, fn) {
      let param = new FormData() // 创建form对象
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      param.append('coverImage', convertBase64UrlToBlob(file))
      axios.post(UPLOAD_IMAGE, param, config).then(res => {
        if (res.data.code !== 0) {
          this.$message.error(res.data.msg)
        }
        fn(res)
      })
    },
    // 重置表单
    resetForm() {
      this.form.coverImage = ''
      this.form.categoryId = ''
      this.form.tasteIds = []
      this.form.productName = ''
      this.form.inventory = ''
      this.form.description = ''
      this.form.recommended = ''
      this.form.price = ''
      this.clearImg()
    },
    _getTasteList() {
      Axios({
        url: GET_SASTE_LIST,
        method: 'GET'
      }).then(res => {
        if (res.data.code !== 0) {
          this.$message.error(res.data.msg)
          return
        }
        this.sasteList = res.data.data.list
      })
    },
    _getCategoryList() {
      Axios({
        url: GET_CATEGORY,
        method: 'GET'
      }).then(res => {
        if (res.data.code !== 0) {
          this.$message.error(res.data.msg)
          return
        }
        this.categoryList = res.data.data.list
      })
    },
    _subForm(shelvesState) {
      Axios({
        url: ADD_PRODUCT_PPRO,
        method: 'POST',
        data: {
          imageId: this.form.coverImage,
          categoryId: this.form.categoryId,
          tasteIds: this.form.tasteIds,
          productName: this.form.productName,
          inventory: this.form.inventory,
          description: this.form.description,
          recommended: this.form.recommended,
          shelvesState: shelvesState,
          price: this.form.price
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.resetForm()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  created() {
    this._getTasteList()
    this._getCategoryList()
    console.log(this.$route)
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable'
.manage-add
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
  .button-footer .el-form-item
    margin-bottom 0
  .el-button
    font-size 20px
  .el-button--default:focus, .el-button--default:hover
    color #666
    border-color #999
  .el-button--primary:focus
    color #fff
  .img
    .el-form-item__content>div
      display flex
      width 340px
      justify-content space-between
      margin 0
      &.reselect
        display flex
        padding-bottom 20px
        width 530px
        .el-button
          font-size 14px
          color #333
        p
          color #999
      &.cropImg
        width 520px
        display inline-block
        text-align center
        .vue-cropper
          margin-bottom 20px
        .el-button
          padding 10px 18px
          font-size 18px
    .el-upload--picture-card
      width 150px
      height 150px
      border 1px solid #eee
      background-color #f5f5f5
      display flex
      align-items center
      justify-content center
      flex-direction column
      .iconfont
        font-size 30px
        height 30px
        color #cccccc
        display block
    .el-upload-list--picture-card
      display none
    .el-upload__tip
      margin 0
      display flex
      flex-direction column
      justify-content space-between
      padding 38px 0
      p
        line-height 1
        font-size 14px
    .vue-cropper
      width 520px
      height 317px
      border-radius 5px
      border 1px solid #eee
      background-image inherit
      .cropper-crop-box
        display none
      .cropper-modal
        background-color transparent
</style>