<style>
.package {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

</style>
<template>
  <div>
    <div class="package">
      <label>From</label>
      <input type="number" v-model="orderFrom">
      <label>Until</label>
      <input type="number" v-model="orderUntil">
      <label>Total</label>
      <span> {{orderUntil - (orderFrom- 1) }}</span>
      <span>Thick(mm)</span>
      <input type="number" v-model="thickness">
      <label>Board</label>
      <input type="number" v-model="boardSize">
    </div>
   
    <div>Package : {{envelopePackageAmount / 2}} <span>X 2</span><span> = {{envelopePackageAmount}}</span> </div>
  </div>
</template>
<script>
export default {
  name: "Packaging",
  computed: {
    envelopePackageAmount() {
      return this.$store.getters.envelopePackageAmount;
    },
    thickness: {
      get() {
        return this.$store.state.board.thickness;
      },
      set(value) {
        this.$store.commit("updateThickness", value);
      }
    },
    boardSize: {
      get() {
        return this.$store.state.board.boardSize;
      },
      set(value) {
        this.$store.commit("updateBoardSize", value);
      }
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