import * as types from './mutation-types'

export default {
  [types.SET_PRODUCT_ID](state, id) {
    state.id = id
  }
}
