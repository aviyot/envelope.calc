<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <td>Type</td>
            <th>Amount</th>
            <th>From &numero;</th>
            <th>Until &numero;</th>
          </tr>
        </thead>
        <tbody>
          <!--    <tr v-for="dis in dist" :key="dis.name">
          <th v-on:click="updateRange(dis.orderFrom,dis.orderUntil)">{{dis.name}}</th>
          <td>
            <v-text-field type="number" v-model = "dis.orderFrom"  dense hide-details></v-text-field>
          </td>
          <td>
          <v-text-field type="number" v-model = "dis.orderUntil" dense hide-details></v-text-field>
          </td>
          <td>{{dis.orderUntil - dis.orderFrom +1}}</td>
        </tr> -->
          <tr>
            <td>{{ dist[0].name }}</td>

            <td>
              <v-text-field
                type="number"
                v-model="dist[0].amount"
                dense
                hide-details
              ></v-text-field>
            </td>
            <td>{{ 1 }}</td>
            <td>{{ +dist[0].amount }}</td>
          </tr>
          <tr>
            <td>{{ dist[1].name }}</td>

            <td>
              <v-text-field
                type="number"
                v-model="dist[1].amount"
                dense
                hide-details
              ></v-text-field>
            </td>
            <td>{{ +dist[0].amount + 1 }}</td>
            <td>{{ +dist[0].amount + +dist[1].amount }}</td>
          </tr>
          <tr>
            <td>{{ dist[2].name }}</td>

            <td>
              <v-text-field
                type="number"
                v-model="dist[2].amount"
                dense
                hide-details
              ></v-text-field>
            </td>
            <td>{{ +dist[0].amount + +dist[1].amount + 1 }}</td>
            <td>{{ +dist[0].amount + +dist[1].amount + +dist[2].amount }}</td>
          </tr>
          <tr>
            <td>{{ dist[3].name }}</td>

            <td>
              <v-text-field
                type="number"
                v-model="dist[3].amount"
                dense
                hide-details
              ></v-text-field>
            </td>
            <td>
              {{ +dist[0].amount + +dist[1].amount + +dist[2].amount + 1 }}
            </td>
            <td>
              {{
                +dist[0].amount +
                +dist[1].amount +
                +dist[2].amount +
                +dist[3].amount
              }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
// import {mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Distribution",
  computed: {
    ...mapState(["dist"]),
  },
  methods: {
    updateRange(from, until) {
      this.$store.commit("updateOrderFrom", from);
      this.$store.commit("updateOrderUntil", until);
    },
  },
};
</script>
<style scoped>
</style>