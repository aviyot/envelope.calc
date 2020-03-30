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
  <div>
    <div class="package">
     <div>
        <label>From</label>
        <input type="number" v-model="orderFrom">
      </div>
      <div>
        <label>Until</label>
        <input type="number" v-model="orderUntil">
      </div>
      <div>
        <label>Total</label>
        <span> {{orderUntil - (orderFrom- 1) }}</span>
      </div>
     
    </div>
   
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