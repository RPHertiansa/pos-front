import Vue from 'vue'
import Vuex from 'vuex'
import auth from './Auth'
import product from './Product'
import history from './History'
import category from './Category'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    product,
    history,
    category
  }
})
