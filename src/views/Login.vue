<template>
<div class="container-fluid">
  <div class="row d-flex justify-content-center main-page">
    <div class="col-lg-4 col-11  login p-4">
      <form @submit.prevent="login">
        <h3 class="text-center" style="color: #F24F8A">Login</h3>
        <p class="text-left mt-4 mb-4">Hi, Welcome back!</p>

        <div class="md-form">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" class="form-control">
        </div>

        <div class="md-form" style="">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" class="form-control">
        </div>

        <div class="form-group text-right">
          <router-link to="forgot-password" style="color: #F24F8A;">Forgot Password ?</router-link>
        </div>

        <div class="form-group text-center">
          <button type="submit" class="btn btn-block login-btn">Login</button>
        </div>

        <div class="form-group text-center">
       <p>Don’t have an account? <router-link to="/register" style="color: #F24F8A">Sign Up</router-link></p>
        </div>

      </form>
    </div>
  </div>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      onLogin: 'auth/onLogin'
    }),
    login () {
      const userData = {
        email: this.email,
        password: this.password
      }
      this.onLogin(userData)
        .then((response) => {
          if (response === 'Need Activation') {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            this.needActivation()
          } else if (response !== 'Login Success') {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            this.failedLogin()
          } else {
            window.location = '/'
          }
        })
    },
    failedLogin () {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your email or password!'
      })
    },
    needActivation () {
      Swal.fire({
        icon: 'warning',
        title: 'Unverified Account',
        text: 'Please check your email to verify your account!'
      })
    }
  }
}
</script>
<style scoped>

.main-page {
  margin-top: 90px;
  overflow-y: hidden;
}
.login {
  background: #ffffff;
  border-radius: 30px;
  text-align: left;
  border: 1px solid #57CAD5;
}
.line {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-width: 1px;
}
.login-btn {
  background: #57CAD5;
  border-radius: 50px;
  color: #ffffff;
  padding: 15px;
}
</style>
