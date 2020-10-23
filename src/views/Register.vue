<template>
<div class="container-fluid">
  <div class="row d-flex justify-content-center main-page">
    <div class="col-lg-4 col-11  register p-4">
      <form @submit.prevent="register()">
        <div class="row">
          <div class="col-lg-1 col-1">
          </div>
          <div class="col-lg-11 col-11">
              <h3 class="text-center" style="color: #F24F8A; margin-left: -30px">Register</h3>
          </div>
        </div>
        <p class="text-left  mt-4 mb-4">Let's create your account!</p>

        <div class="md-form">
          <label for="name">Name</label>
          <input type="text" v-model="name" id="name" class="form-control">
        </div>

        <div class="md-form">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" class="form-control">
        </div>

        <div class="md-form">
          <label for="password1">Password</label>
          <input type="password" v-model="password" id="password1" class="form-control">
        </div>

        <div class="form-group text-center mt-5">
          <button type="submit" class="btn btn-block btn-register">Register</button>
        </div>
      </form>
      <p class="text-right">Already have an account? <router-link to="/login" style="color: #F24F8A">Sign In</router-link></p>
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
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      onRegister: 'auth/onRegister'
    }),
    register () {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.onRegister(userData)
        .then((response) => {
          if (response === 'Success Registration, Please activate your email') {
            Swal.fire({
              icon: 'success',
              title: 'You are registered!',
              text: 'Please check your email to activate your account!'
            })
            window.location = '/login'
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Duplicate Email',
              text: 'Please use different email as this one is already registered'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style>

.main-page {
  margin-top: 90px;
  overflow-y: hidden;
}
.register {
  background: #ffffff;
  border: 1px solid #57CAD5;
  border-radius: 30px;
  text-align: left
}
.line {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-width: 1px;
}
.btn-register {
  background: #57cad5 !important;
  border-radius: 50px !important;
  color: #ffffff !important;
  padding: 15px !important;
}
</style>
