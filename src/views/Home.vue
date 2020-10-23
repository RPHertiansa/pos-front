<template>
  <div class="home">
    <ModalCheckout />
    <ModalInsert />
    <div>
        <div class="modal" id="edit-modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <form class="form-edit" @submit.prevent="edit()" enctype="multipart/form-data">
                  <h5 class="modal-title mb-4 font-weight-bold">Edit Item</h5>
                  <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control shadow-input" v-model="form.name" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="image" class="col-sm-2 col-form-label">Image</label>
                    <div class="col-sm-10">
                      <input type="file" @change="process($event)"  class="form-control shadow-input"/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="price" class="col-sm-2 col-form-label">Price</label>
                    <div class="col-sm-7">
                      <input type="number" id="price" class="form-control shadow-input" v-model="form.price" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="category" class="col-sm-2 col-form-label">Category</label>
                    <div class="col-sm-5">
                      <select id="category" class="form-control shadow-input" v-model="form.id_category">
                        <option selected value disabled>Choose Category</option>
                        <option v-for="(item, index) in Category.data" :key="index" :value="item.id_category">{{item.category}}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-12 text-right btn-footer">
                      <button type="button" class="btn btn-cancel" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn btn-edit">Edit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 col-12">
            <div class="row main-item">
              <div class="col-lg-9 col-md-12">
                <div class="row navbar-item">
                  <div class="col-lg-1 col-md-1 col-2">
                    <img src="../assets/img/menu (1).png" alt />
                  </div>
                  <div class="col-lg-10 col-md-10 col-8">
                    <h3 class="font-weight-bold">Food Items</h3>
                  </div>
                  <div class="col-lg-1 col-md-1 col-2">
                    <a
                      class=""
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    ><img src="../assets/img/magnifying-glass.png" alt /></a>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-1 col-md-12 col-12 sidebar">
                    <Sidebar :newcart="newCart"/>
                  </div>
                  <div class="col-lg-11 content">
                    <Card @update="updateData" @addtocart="addToCart"/>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 main-cart">
                <Cart :newcart="newCart" @plus="plus"  @minus="minus"/>

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

import Sidebar from '@/components/Sidebar.vue'
import Card from '@/components/Card.vue'
import Cart from '@/components/Cart.vue'
import ModalInsert from '@/components/ModalInsert.vue'
import ModalCheckout from '@/components/ModalCheckout.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Card,
    Cart,
    ModalInsert,
    ModalCheckout
    // ModalEdit
  },
  data () {
    return {
      form: {
        name: null,
        price: null,
        image: null,
        id_category: null
      },
      updateId: null,
      updateIndex: null,
      id: null,
      indexProduct: null,
      newCart: []
    }
  },
  computed: {
    ...mapGetters({
      Category: 'category/getAllCategory',
      Products: 'product/getAllProducts'
    })
  },
  methods: {
    ...mapActions({
      getAllCategory: 'category/getAllCategory',
      getAllProducts: 'product/getAllProducts',
      actionupdateData: 'product/update'
    }),
    process (event) {
      this.form.image = event.target.files[0]
    },
    updateData (id, index) {
      this.updateId = id
      console.log(this.Products.data[index].name)
      this.form.name = this.Products.data[index].name
      this.form.price = this.Products.data[index].price
      this.form.image = this.Products.data[index].image
      this.form.category_id = this.Products.data[index].category_id
    },
    edit () {
      const fd = new FormData()
      fd.append('name', this.form.name)
      fd.append('image', this.form.image)
      fd.append('price', this.form.price)
      fd.append('category_id', this.form.category_id)
      const data = {
        id: this.updateId,
        formdata: fd
      }
      this.actionupdateData(data)
        .then((response) => {
          if (response === 'Image size is too big! Please upload another one with size <5mb') {
            Swal.fire({
              icon: 'error',
              title: 'Image size too large!',
              text: 'Please upload another one with size <5mb'
            })
          } else if (response === 'Image type must be JPG or JPEG') {
            Swal.fire({
              icon: 'error',
              title: 'Incorrect file type!',
              text: 'Please upload image with JPG or JPEG extension'
            })
          } else if (response === 'Update success') {
            Swal.fire({
              icon: 'success',
              title: 'Product is updated'
            })
            window.location = '/'
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Something wrong'
            })
          }
        }).catch((err) => {
          alert(err)
        })
    },
    addToCart (id, index) {
      this.id = id
      this.indexProduct = index
      const carts = this.newCart.filter(e => e.id === id)
      if (carts.length <= 0) {
        const data = this.Products.data.filter(e => e.id === id)
        data[0].qty = 1
        this.newCart = [...this.newCart, data[0]]
      } else {
        const oldData = this.newCart.map((e) => {
          if (e.id === id) {
            e.qty += 1
          }
          return e
        })
        this.newCart = oldData
      }
    },
    minus (index) {
      console.log(index)
      const cart1 = this.newCart[index].id
      const datafilter = this.newCart.filter((e) => {
        if (e.id === cart1) {
          e.qty -= 1
          if (e.qty < 1) {
            e.qty = 1
          }
        }
        return e
      })
      this.newCart = datafilter
      // console.log(datafilter)
    },
    plus (index) {
      console.log(index)
      const cart1 = this.newCart[index].id
      const datafilter = this.newCart.filter((e) => {
        if (e.id === cart1) {
          e.qty += 1
        }
        return e
      })
      this.newCart = datafilter
      // console.log(datafilter)
    }
  }
}
</script>

<style scoped>
.navbar-item {
  display: flex;
  align-items: center;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.sidebar {
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.content {
  background: rgba(190, 195, 202, 0.3);
}

/* ////////// */
@media (max-width: 992px) {
  .main-cart {
    display: none;
  }
}
.form-edit {
  font-weight: bolder;
}
.btn-footer {
  margin-top: 20px;
  font-weight: bold;
}
.shadow-input {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.btn-edit {
  margin-left: 7px;
  background: #57cad5;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
.btn-edit:hover {
  margin-left: 7px;
  background: #46d1dd;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
.btn-cancel {
  background: #f24f8a;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
.btn-cancel:hover {
  background: #fa3a81;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
</style>
