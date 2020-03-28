<style>
.package {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.package div {
 display: grid;
  grid-template-columns: 1fr;
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
      <div>
        <span>Thick(mm)</span>
        <input type="number" v-model="thickness">
      </div>
      <div>
        <label>Board</label>
        <input type="number" v-model="boardSize">
      </div>
      <div>
          <label>Package </label>
          <span> {{envelopePackageAmount / 2}} X 2 = {{envelopePackageAmount}}</span>

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