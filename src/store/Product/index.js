/* eslint-disable no-unused-vars */
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
  getAllProducts (state) {
    return state.all
  }
}

const mutations = {
  SET_ALL_DATA_PRODUCT (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  }
}

const actions = {
  getAllProducts (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/product/getall`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  search (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/product/getall?name=${payload}`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },

  sortLatest (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/product/getall?sort=id?type=desc`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  sortNameA (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/product/getall?sort=name`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  sortNameZ (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/product/getall?sort=name&type=desc`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  sortPriceLow (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/product/getall?sort=price`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  sortPriceHigh (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/product/getall?sort=price&type=desc`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  insert (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.post(`${URL}/product/insert`, payload)
        .then((response) => {
          resolve(response.data.message)
        }).catch((err) => {
          console.log(err.message)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  update (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.put(`${URL}/product/update/${payload.id}`, payload.formdata)
        .then((response) => {
          resolve(response.data.message)
        }).catch((err) => {
          console.log(err.message)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  delete (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${URL}/product/delete/${payload}`)
        .then((response) => {
          console.log(response)
          resolve(response.data.message)
          window.location = '/'
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
