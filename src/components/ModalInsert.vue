<template>
  <div>
    <!-- Modal Add-->
    <div class="modal" id="add-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <form class="form-add" @submit.prevent="insert()" enctype="multipart/form-data">
              <h5 class="modal-title mb-4 font-weight-bold">Add Item</h5>
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
                  <select id="category" class="form-control shadow-input" v-model="form.category_id">
                    <option selected value disabled>Choose Category</option>
                    <option v-for="(item, index) in Category.data" :key="index" :value="item.id">{{item.category}}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12 text-right btn-footer">
                  <button type="button" class="btn btn-cancel" data-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-add">Add</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'ModalAdd',
  data () {
    return {
      form: {
        name: '',
        price: '',
        image: '',
        category_id: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      Category: 'category/getAllCategory'
    })
  },
  methods: {
    process (event) {
      this.form.image = event.target.files[0]
    },
    ...mapActions({
      getAllCategory: 'category/getAllCategory'
    }),

    insert () {
      const fd = new FormData()

      fd.append('name', this.form.name)
      fd.append('image', this.form.image)
      fd.append('price', this.form.price)
      fd.append('category_id', this.form.category_id)

      this.insertData(fd)
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
          } else if (response === 'Product is inserted') {
            Swal.fire({
              icon: 'success',
              title: 'Product is inserted'
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

    ...mapActions({
      insertData: 'product/insert'
    })
  },
  created () {
    this.getAllCategory()
  }
}
</script>

<style scoped>
.form-add {
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
.btn-add {
  margin-left: 7px;
  background: #57cad5;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
.btn-add:hover {
  margin-left: 7px;
  background: #45d0dd;
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
  background: #f0397c;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
</style>
