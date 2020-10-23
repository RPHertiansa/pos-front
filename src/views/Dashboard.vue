<template>
  <div>
    <div class="row">
      <div class="col-lg-12 text-center">
        <Header type="dashboard" class="shadow head"></Header>
      </div>
      <div class="col-lg-1 shadow text-center w-25">
        <Sidebar/>
      </div>
      <div class="col-lg-11">
        <div class="row col-md-12 mx-auto mt-4" style="font-weight: bold;">
          <div class="card col-md-3 col-sm-12 mx-auto pink">
              <p>Today's income</p>
              <p style="font-size: 150%;">Rp. 1.000.000</p>
              <p>+2% Yesterday</p>
          </div>
          <div class="card col-md-3 col-sm-12 mx-auto blue">
              <p>Orders</p>
              <p style="font-size: 150%;">3.270</p>
              <p>+5% Last Week</p>
          </div>
          <div class="card col-md-3 col-sm-12 mx-auto purple">
              <p>This Year's income</p>
              <p style="font-size: 150%;">Rp. 100.000.000.000</p>
              <p>+10% Last Year</p>
          </div>
        </div>
        <div class="shadow mt-4">
          <span v-bolder="'bold'">Revenue</span>
          <Chart/>
        </div>
        <div class="shadow mt-4">
          <span v-bolder="'bold'">Recent Order</span>
          <Table/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Chart from '../components/Chart'
import Table from '../components/Table'

export default {
  directives: {
    bolder: {
      bind: (element, binding) => {
        element.style.fontWeight = binding.value
      }
    }
  },
  components: {
    Header,
    Sidebar,
    Chart,
    Table
  }
}
</script>
<style scoped>
.shadow{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.pink{
  background-image: url('../assets/img/pink.png');
}
.blue{
  background-image: url('../assets/img/blue.png');
}
.purple{
  background-image: url('../assets/img/purple.png');
}
</style>
