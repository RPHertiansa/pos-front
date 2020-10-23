import axios from 'axios'
import { URL } from '../../helpers/env'

const state = () => {
  return {
    all: {
      data: [],
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  }
}

const getters = {
  getAllCategory (state) {
    return state.all
  }
}

const mutations = {
  SET_ALL_DATA_CATEGORY (state, payload) {
    state.all.data = payload
  }
}

const actions = {
  getAllCategory (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/category/getall`)
        .then((response) => {
          context.commit('SET_ALL_DATA_CATEGORY', response.data.data)
        }).catch((err) => {
          console.log(err)
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
