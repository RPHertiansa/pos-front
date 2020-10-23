/* eslint-disable no-unused-vars */
import axios from 'axios'
import { URL } from '../../helpers/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin: (state) => {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  onRegister: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}/users/register`, {
        name: payload.name,
        email: payload.email,
        password: payload.password
      })
        .then((result) => {
          resolve(result.data.message)
        })
        .catch((err) => {
          reject(new Error(err))
        })
    })
  },
  onLogin: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}/users/login`, {
        email: payload.email,
        password: payload.password
      }).then(result => {
        resolve(result.data.message)
        localStorage.setItem('token', result.data.data.token)
        localStorage.setItem('refreshToken', result.data.data.refreshToken)
      }).catch(err => {
        console.log(err)
      })
    })
  },
  onLogout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      resolve('Logout success')
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
