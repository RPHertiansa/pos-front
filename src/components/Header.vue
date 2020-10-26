<template>
<div>
  <b-navbar>
    <div v-if="type === 'home'">
        <b-navbar-brand href="#">Food Item</b-navbar-brand>
    </div>
    <div v-else-if="type === 'dashboard'">
        <b-navbar-brand href="#">History</b-navbar-brand>
    </div>
  </b-navbar>
</div>
</template>

<script>
export default {
  props: ['type']
}
</script>
<style>
.head{
  margin: auto;
  font-weight: bold;
}
</style>
