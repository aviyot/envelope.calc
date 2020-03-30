<template>
  <div class="board">
    <div>PACKAGE</div>
    <div class="floors">
      <div>Floors : {{ calBoardFloors.floors | fixed(2) }}</div>
      <div>
        <span>
          {{packageAmount(envelopePackageAmount).fullPackageAmount}}
          <span>P</span>
          <span>X</span>
          {{envelopePackageAmount}}
          <span>E</span>
        </span>
        <span
          v-if="!isEqualMax"
        >+ {{packageAmount(envelopePackageAmount).lastPackageEnvelopesAmount}}E</span>
      </div>
    </div>
    <div class="full-floors">
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
        <span>Thick :</span>
        <span>{{packageThickness}}</span>
      </div>
    </div>
    <div>Max Board : {{ maxAmount }}</div>
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
    ])
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
.full-floors > div{
display: grid;
grid-template-columns: 1fr 1fr
}

</style>