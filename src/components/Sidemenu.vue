<template>
  <div class="side">
    <div v-b-modal.sidebar-1 class="side-cart">
      <img src="../assets/icon/shopping_cart-black-48dp.svg" alt />
    </div>

    <router-link to="/">
      <img src="../assets/img/fork.png" alt />
    </router-link>

    <router-link to="/dashboard">
      <img src="../assets/img/clipboard.png" alt />
    </router-link>

    <router-link to="" data-toggle="modal" data-target="#add-modal">
      <img src="../assets/img/add.png" alt />
    </router-link>

    <a style="cursor: pointer" @click="onLogout()">
     <img src="../assets/img/logout.png" alt="" style="height: 50px;">
    </a>

    <b-modal id="sidebar-1" width="100%" shadow>
      <div class="px-3 py-2">
        <Cart :newcart="newcart"/>
      </div>
    </b-modal>
  </div>
</template>

<script>

import Cart from '@/components/Cart.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Sidemenu',
  props: ['newcart'],
  components: {
    Cart
  },
  methods: {
    ...mapActions({
      actionLogout: 'auth/onLogout'
    }),
    onLogout () {
      this.actionLogout().then(() => {
        window.location = '/login'
      })
    }
  }
}

</script>

<style scoped>
.side img {
  margin-top: 20px;
  margin-bottom: 20px;
}
.side-cart {
  display: none;
}
.logout{
  margin-top: 20px;
}
@media (max-width: 992px) {
  .main-cart {
    display: none;
  }
  .side-cart {
    display: unset;
  }

  .side {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .side img {
    margin-left: 10px;
    margin-right: 10px;
  }
  .logout {
    margin-left: 20px;
    margin-top: 0;
  }
}
</style>
