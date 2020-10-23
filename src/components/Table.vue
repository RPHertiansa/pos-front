<template>
  <div>
    <b-table striped hover :items="allHistory.data"></b-table>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters({
      allHistory: 'history/getAllHistory'
    })
  },
  methods: {
    ...mapActions({
      actionGetAllHistory: 'history/getAllHistory'
    })
  },
  mounted () {
    this.actionGetAllHistory()
  }
}
</script>
