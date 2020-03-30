<template>
  <div class="board">
    <div>PACKAGE</div>
    <div>
      <label>Board</label>
      <input type="number" v-model="boardSize">
    </div>

    <div class="package" >
      <div class="floors">
        <div>
          <span>Thick(mm)</span>
          <input type="number" v-model="thickness">
        </div>

        <div>
          <span>Floors</span>
          <label>{{ calBoardFloors.floors | fixed(2) }}</label>
        </div>

        <div>
          <label>0.5 pack</label>
          <span>{{envelopePackageAmount / 2}}</span>
        </div>

        <div>
          <label>1 pack</label>
          <span>{{envelopePackageAmount}}</span>
        </div>

        <div>
          <label>No. Pack</label>
          <span>{{packageAmount(envelopePackageAmount).fullPackageAmount}}</span>
        </div>

        <div v-if="!isEqualMax">
          <label>Last Pack</label>
          <span>{{packageAmount(envelopePackageAmount).lastPackageEnvelopesAmount}}</span>
        </div>
      </div>
      <div class="full-floors">
        <div>
          <span>Thick </span>
          <span>{{packageThickness}}</span>
        </div>
        <div>
          <span>Floors</span>
          <label>{{ calBoardFloors.fullFloors }}</label>
        </div>

        <div>
          <label>0.5 pack</label>
          <span>{{ packageFullFloor }}</span>
        </div>

        <div>
          <label>1 pack</label>
          <span>{{ packageFullFloor * 2}}</span>
        </div>

        <div>
          <label>No. Pack</label>
          <span>{{ packageAmount(packageFullFloor*2).fullPackageAmount}}</span>
        </div>

        <div v-if="!isEqualMax">
          <label>Last Pack</label>
          <span>{{packageAmount(packageFullFloor*2).lastPackageEnvelopesAmount}}</span>
        </div>
        <div>
          <label>Max Board</label>
          <span>{{ maxAmount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Board",
  computed: {
    ...mapGetters([
      "envelopePackageAmount",
      "boardSize",
      "envelopesAmount",
      "envelopesBetweenAmount",
      "calBoardFloors",
      "isEqualMax",
      "packageFullFloor",
      "maxAmount",
      "packageFullFloor",
      "packageAmount",
      "packageFullFloor",
      "packageThickness"
    ]),
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
<style scoped>
.full-floors > div,
.floors > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.package {
  display: grid;
  grid-row-gap: 10px;
  grid-template-columns: 1fr;
}
</style>