import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters'
// import * as actions from './actions'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const state = {
  id: 0
}
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  // actions,
  // getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
