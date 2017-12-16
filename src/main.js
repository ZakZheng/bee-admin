// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'common/element-ui/index.css'
import 'common/stylus/main.styl'

import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/404.jpg'),
  loading: require('./assets/loading-spin.svg'),
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
