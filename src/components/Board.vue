<template>
  <div class="board">
    <div>PACKAGE</div>
    <div class="floors">
    <div>Floors : {{ calBoardFloors.floors | fixed(2) }}</div>
    <div >
      <span>
        {{packageAmount(envelopePackageAmount).fullPackageAmount}}<span>P</span>
        <span> X</span>
        {{envelopePackageAmount}}<span>E</span>
      </span>
      <span v-if="!isEqualMax">+ {{packageAmount(envelopePackageAmount).lastPackageEnvelopesAmount}}E</span>
    </div>
    </div>
    <div class ="full-floors">
    <div>For {{ calBoardFloors.fullFloors }} floors :{{ packageFullFloor }}</div>
    <div>
      <span>Thickness : </span>
      <span> {{packageThickness}}</span>
    </div >
      <span>
        {{packageAmount(packageFullFloor*2).fullPackageAmount}}
        <span>X</span>
        {{packageFullFloor*2}}
      </span>
      <span v-if="!isEqualMax">+ {{packageAmount(packageFullFloor*2).lastPackageEnvelopesAmount}}</span>
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

.full-floors {
margin: 5px;
}
.floors {
  margin: 5px;
}
</style>