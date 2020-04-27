<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <td>Type</td>
          <th>From</th>
          <th>Until</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dis in dist" :key="dis.name">
          <th v-on:click="updateRange(dis.orderFrom,dis.orderUntil)">{{dis.name}}</th>
          <td>
            
            <v-text-field type="number" v-model="dis.orderFrom"  dense hide-details></v-text-field>
          </td>
          <td>
          <v-text-field type="number" v-model="dis.orderUntil" dense hide-details></v-text-field>

          </td>
          <td>{{dis.orderUntil - dis.orderFrom +1}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
// import {mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Distribution",
  computed: {
    ...mapState(["dist"])
  },
  methods: {
    updateRange(from, until) {
      this.$store.commit("updateOrderFrom", from);
      this.$store.commit("updateOrderUntil", until);
    }
  }
};
</script>
<style scoped>
</style>