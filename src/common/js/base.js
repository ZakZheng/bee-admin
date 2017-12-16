import axios from 'axios'
import Qs from 'qs'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export function Format(dateStr) {
  dateStr *= 1000
  var time = new Date(dateStr)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  return y + '.' + m + '.' + d + ' ' + h + ':' + mm
}

export function Axios(option) {
  return new Promise((resolve, reject) => {
    if (option.method === 'GET') {
      axios({
        url: option.url,
        method: 'GET',
        params: option.data || {},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code === -3) {
          router.push('/')
          ElementUI.Message({
            message: '请先登录',
            type: 'error'
          })
        } else {
          resolve(res)
        }
      }).catch((err) => {
        reject(err)
      })
    } else {
      axios({
        url: option.url,
        method: option.method,
        data: Qs.stringify(option.data) || {},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code === -3) {
          router.push('/')
          ElementUI.Message({
            message: '请先登录',
            type: 'error'
          })
        } else {
          resolve(res)
        }
      }).catch((err) => {
        reject(err)
      })
    }
  })
}

export function convertBase64UrlToBlob(urlData) {
  // 去掉url的头，并转换为byte
  var bytes = window.atob(urlData.split(',')[1])
  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: 'image/jpeg' })
}
