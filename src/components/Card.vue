<template>
<div>
  <div>
     <div class="collapse" id="collapseExample">
      <div class="card card-body">
       <form v-on:submit.prevent="">
         <input type="text" name="search"  @keyup="search(name)" v-model="name" id="search" class="form-control" placeholder="Search ...">
       </form>
      </div>
    </div>
  </div>
  <div>
    <div class="dropdown dropleft text-right mt-3">
  <button type="button" class="btn blue-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     Sort by
  </button>
  <div class="dropdown-menu">
      <a class="dropdown-item" @click="sortLatest()" style="cursor: pointer;">Latest Products</a>
      <a class="dropdown-item" @click="sortNameA()" style="cursor: pointer;">Product Name A-Z</a>
      <a class="dropdown-item" @click="sortNameZ()" style="cursor: pointer;">Product Name Z-A</a>
      <a class="dropdown-item" @click="sortPriceLow()" style="cursor: pointer;">Lowest Price</a>
      <a class="dropdown-item" @click="sortPriceHigh()" style="cursor: pointer;">Highest Price</a>
  </div>
</div>
  </div>
  <div class="main-card">
    <div v-if="Products.isLoading">
      <div class="row" style="height: 45vw">
        <div class="col-lg-12">
          <b-icon icon="arrow-counterclockwise" animation="spin-reverse-pulse" font-scale="10"></b-icon>
        </div>
      </div>
    </div>
    <div v-else>
       <div v-if="Products.data.length === 0" style="height: 45vw">
          <div class="row">
            <div class="col-lg-12">
               <h1 class="text-center font-weight-bold m-auto">Data not found</h1>
            </div>
          </div>
        </div>
            <div v-else>
              <div class="row text-center">
                <div class="col-md-4 col-6" v-for="(item, index) in Products.data" :key="index">
                  <div class="card-item">
                    <img
                      class="card-img-top"
                      :src="`${URL}${item.image}`"
                      alt="Expresso"
                    />
                  </div>
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-6 text-left">
                      <div class="card-bottom">
                        <p style="margin-bottom: -1px; text-align: left">{{ item.name }}</p>
                        <p style="text-align: left">
                          <strong>Rp. {{ formatPrice(item.price) }}</strong>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-6 text-right row">
                      <div class="row ml-auto d-none d-sm-block">
                          <b-button class="mr-1 h-75 blue-btn" data-toggle="modal" @click="$emit('addtocart',item.id,index)" style="cursor: pointer;"><b-icon-cart3 class="text-white"></b-icon-cart3></b-button>
                          <b-button class="mr-1 h-75 pink-btn" data-toggle="modal" data-target="#edit-modal" @click="$emit('update',item.id,index)" style="cursor: pointer;"><b-icon-pencil class="text-white"></b-icon-pencil></b-button>
                          <b-button class="mr-1 h-75 btn-danger" @click="onDelete(item.id)" style="cursor: pointer;"><b-icon-trash class="text-white"></b-icon-trash></b-button>
                      </div>
                      <b-dropdown class="d-block d-sm-none ml-auto" id="dropdown-dropleft" dropleft size="md" variant="black" toggle-class="text-decoration-none" no-caret>
                          <template v-slot:button-content>
                            <b-icon-box-arrow-left variant="black"></b-icon-box-arrow-left>
                          </template>
                           <b-dropdown-item data-toggle="modal" @click="$emit('addtocart',item.id,index)" style="cursor: pointer;">Add To Cart</b-dropdown-item>
                          <b-dropdown-item data-toggle="modal" data-target="#edit-modal" @click="$emit('update',item.id,index)" style="cursor: pointer;">Edit</b-dropdown-item>
                          <b-dropdown-item @click="onDelete(item.id)" style="cursor: pointer;">Delete</b-dropdown-item>
                        </b-dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import currency from '../mixins/currency'
import { BASE_URL } from '../helpers/env'

export default {
  mixins: [currency],
  name: 'Card',
  data () {
    return {
      name: '',
      URL: BASE_URL
    }
  },
  computed: {
    ...mapGetters({
      Products: 'product/getAllProducts'
    })
  },
  methods: {
    ...mapActions({
      sortLatest: 'product/sortLatest',
      getAllProducts: 'product/getAllProducts',
      search: 'product/search',
      sortNameA: 'product/sortNameA',
      sortNameZ: 'product/sortNameZ',
      sortPriceLow: 'product/sortPriceLow',
      sortPriceHigh: 'product/sortPriceHigh',
      actionDelete: 'product/delete'
    }),
    onDelete (id) {
      this.actionDelete(id)
        .then((response) => {
          console.log(response)
          console.log(id)
        })
    }
  },

  mounted () {
    this.getAllProducts()
  }
}
</script>

<style scoped>
.main-card {
  margin-top: 20px;
}
.blue-btn {
  background: #57CAD5;
  color: #ffffff;
}
.pink-btn{
  background: #f24f8a;
  color: #ffffff;
}
</style>
