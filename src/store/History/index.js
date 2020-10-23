import axios from 'axios'
import { URL } from '../../helpers/env'
const state = () => {
  return {
    all: {
      data: [],
      isLoading: false
    }
  }
}

const getters = {
  getAllHistory (state) {
    return state.all
  }
}

const mutations = {
  SET_ALL_HISTORY (state, payload) {
    state.all.data = payload
  },
  SET_LOADING_STATUS (state, payload) {
    state.all.isLoading = payload
  }
}

const actions = {
  // eslint-disable-next-line no-unused-vars
  getAllHistory (context, payload) {
    context.commit('SET_LOADING_STATUS', true)
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/history/getall`)
        .then((response) => {
          context.commit('SET_ALL_HISTORY', response.data.data)
          resolve()
          console.log(response.data.data)
        }).catch((err) => {
          reject(err)
        }).finally(() => {
          context.commit('SET_LOADING_STATUS', false)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
