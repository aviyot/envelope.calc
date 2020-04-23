<style scoped>
.package {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.package > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
<template>
  <div >
    <v-row>
      <v-col>
        <v-text-field v-model="orderFrom" label="From" dense required hide-details></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="orderUntil" label="Until" dense required hide-details></v-text-field>
      </v-col>
       <v-col>
        <v-text-field readonly :value="orderUntil - (orderFrom- 1)" label="Total" dense required hide-details></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Packaging",
  computed: {
    envelopePackageAmount() {
      return this.$store.getters.envelopePackageAmount;
    },
    orderFrom: {
      get() {
        return this.$store.state.board.orderFrom;
      },
      set(value) {
        this.$store.commit("updateOrderFrom", value);
      }
    },
    orderUntil: {
      get() {
        return this.$store.state.board.orderUntil;
      },
      set(value) {
        this.$store.commit("updateOrderUntil", value);
      }
    }
  }
};
</script>