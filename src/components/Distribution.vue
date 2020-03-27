<template>
  <div>
    <table>
      <tr>
        <td></td>
        <th>From</th>
        <th>Until</th>
        <th>Total</th>
      </tr>
      <tr v-for="dis in dist" :key="dis.name">
        <th v-on:click="updateRange(dis.orderFrom,dis.orderUntil)">{{dis.name}}</th>
        <td>
          <input type="number" v-model="dis.orderFrom"/>
        </td>
        <td>
          <input type="number" v-model="dis.orderUntil"/>
        </td>
        <td>{{dis.orderUntil - dis.orderFrom +1}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
// import {mapGetters } from "vuex";
import { mapState} from "vuex";

export default {
  name: "Distribution",
  computed: {
    ...mapState(["dist"]),
  },
methods : {
updateRange(from,until){
this.$store.commit("updateOrderFrom",from);
this.$store.commit("updateOrderUntil",until)
}
}
};
</script>
<style scoped>


</style>