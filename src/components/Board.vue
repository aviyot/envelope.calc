<template>
  <div class="board">
    <div>PACKAGE</div>
    <span>One floor : {{ boardSize * envelopePackageAmount }}</span>
    <span>Floors : {{ calBoardFloors.floors | fixed(2) }}</span>
    <span>For {{ calBoardFloors.fullFloors }} floors :{{ packageFullFloor }}</span>
    <span
      v-if="!isEqualMax"
    >{{calBoardFloors.fullFloors * boardSize - 1}} P + {{ envelopesBetweenAmount - (calBoardFloors.fullFloors * boardSize - 1) * packageFullFloor * 2 }} En</span>
    <span v-if="isEqualMax">{{calBoardFloors.fullFloors * boardSize}} Packages</span>
    <span>Max Board : {{ maxAmount }}</span>
  </div>
</template>

<script>
export default {
  name: "Board",
  computed: {
    envelopePackageAmount() {
      return this.$store.getters.envelopePackageAmount;
    },
    isEqualMax() {
      return this.maxAmount === this.envelopesBetweenAmount;
    },
    boardSize() {
      return this.$store.state.board.boardSize;
    },
    envelopesAmount() {
      return this.$store.state.order.envelopesAmount;
    },
    envelopesBetweenAmount() {
      return this.$store.getters.envelopesBetweenAmount;
    },
    calBoardFloors() {
      //envelopePackageAmount, boardSize, envelopesAmount
      return this.$store.getters.calBoardFloors(
        this.envelopePackageAmount,
        this.boardSize,
        this.envelopesBetweenAmount
      );
    },
    packageFullFloor() {
      return Math.ceil(
        this.envelopesBetweenAmount /
          (this.calBoardFloors.fullFloors * this.boardSize * 2)
      );
    },
    maxAmount() {
      return (
        this.calBoardFloors.fullFloors *
        this.boardSize *
        2 *
        Math.ceil(
          this.envelopesBetweenAmount /
            (this.calBoardFloors.fullFloors * this.boardSize * 2)
        )
      );
    }
  },
  filters: {
    fixed: function(value, size) {
      value = +value;
      return value.toFixed(size);
    }
  }
};
</script>
<style>
.board span {
  display: block;
}
</style>