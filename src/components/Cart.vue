<template>
  <div>
    <div class="row navbar-cart">
      <div class="col-lg-12">
        <h3 class="font-weight-bold">Cart <span class="cart-count">{{newcart.length}}</span></h3>
      </div>
    </div>
    <div v-if="newcart.length === 0">
      <div class="row mt-5">
        <div class="col-lg-12">
          <img src="../assets/img/teacup.png" alt />
          <h4>Your cart is empty</h4>
          <h6>Please add some items from the menu</h6>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row mt-5">
        <div class="col-md-12">
          <div v-for="(item, index) in newcart" :key="index">
            <div class="row">
              <div class="col-md-4 col-4 text-center">
                <img :src="`${URL}/${item.image}`" class="img-fluid" />
              </div>
              <div class="col-md-8 col-8">
                <div class="row">
                  <div class="col-md-12 col-12 text-left">
                    <p>
                      <strong>{{item.name}}</strong>
                    </p>
                  </div>
                  <div class="col-md-5 col-5">
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                      <button
                        type="button"
                        @click="$emit('minus', index)"
                        class="btn btn-outline-success"
                      >-</button>
                      <button type="button" disabled class="btn btn-outline-success">{{item.qty}}</button>
                      <button
                        type="button"
                        @click="$emit('plus', index)"
                        class="btn btn-outline-success"
                      >+</button>
                    </div>
                  </div>
                  <div class="col-md-7 col-7">
                    <p>
                      <strong>Rp. {{ formatPrice(item.price * item.qty) }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12" style="margin-top: 140px">
          <div class="row">
            <div class="col-md-6 text-left">
              <strong>Total :</strong>
            </div>
            <div class="col-md-6 text-right">
              <strong>Rp {{formatPrice(total)}}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 text-left" style="margin-bottom: 15px">*Belum termasuk ppn</div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center">
          <button
            class="btn btn-block btn-checkout text-center"
            data-toggle="modal"
            data-target="#checkout-modal"
          >
            <strong>Checkout</strong>
          </button>

          <button @click="cancel" class="btn btn-block btn-cancel text-center">
            <strong>Cancel</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '../helpers/env'
import currency from '../mixins/currency'
export default {
  name: 'Cart',
  props: ['newcart'],
  mixins: [currency],
  data () {
    return {
      URL: BASE_URL,
      total: null
    }
  },
  watch: {
    newcart (newcart) {
      this.total = newcart.reduce((item, data) => {
        return item + (data.price * data.qty)
      }, 0)
    }
  },
  methods: {
    cancel () {
      this.newcart = []
    }
  }
}
</script>

<style scoped>
.navbar-cart {
  display: flex;
  align-items: center;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
}
.btn-checkout {
  background: #4accd8;
  color: #ffffff;
}
.btn-checkout:hover {
  background: #57cad5d0;
  color: #ffffff;
}

.btn-cancel {
  background: #f24f8a;
  color: #ffffff;
}

.btn-cancel:hover {
  background: #f24f8bb6;
  color: #ffffff;
}
.cart-count{
  background: #4accd8;
  color: #ffffff;
  padding: 5px;
  border-radius: 50%;
}
</style>
