<template >
  <v-container>
    <v-row>
      <v-col>
        <label>Thick E / B</label>
      </v-col>
      <v-col>
        <span>{{packageThickness(calcPackageFullFloor(floor))}} mm</span>
        <span> / </span>
        <span>{{(packageThickness(calcPackageFullFloor(floor)) * (Math.ceil(floor) / 10)).toFixed(1) }} cm</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>Pack - Half / Full</label>
      </v-col>
      <v-col>
        <span>{{calcPackageFullFloor(floor)}}E /</span>
        <span>{{calcPackageFullFloor(floor)*2}}E</span>
      </v-col>
    </v-row>

    <!--  <v-row>
      <v-col><label>1 pack</label></v-col>
      <v-col><span>{{calcPackageFullFloor(floor)*2}}</span></v-col>
    </v-row>
    -->
    <v-row>
      <v-col>
        <label>Packs On Floor </label>
      </v-col>
      <v-col>
        <span>{{packageAmount(calcPackageFullFloor(floor)*2).fullPackageAmount}}P</span> /
        <span>{{ Math.ceil(floor) * boardSize}}P</span>
      </v-col>
    </v-row>

    <!-- <div v-if="!isEqualMax"> -->
    <v-row>
      <v-col>
        <label>Last Floor</label>
      </v-col>
      <v-col>
        <span>{{packageAmount(calcPackageFullFloor(floor)*2).fullPackageAmount % boardSize}}P /</span>
        <span>{{packageAmount(calcPackageFullFloor(floor)*2).lastPackageEnvelopesAmount}}E</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label>Board -1 floor / max</label>
      </v-col>
      <v-col>
        <span>{{ boardSize * calcPackageFullFloor(floor)*2 }}E</span> /
        <span>{{maxEnvelopesOnBoard(Math.ceil(floor))}}E</span>
      </v-col>
    </v-row>
    </v-container>
</template>

<script >
import { mapGetters } from "vuex";
export default {
  name: "BoardCalc",
  props: ["floor", "round"],

  computed: {
    ...mapGetters([
      "calcPackageFullFloor",
      "packageThickness",
      "packageAmount",
      "maxEnvelopesOnBoard",
      "boardSize",
      "envelopePackageAmount"
    ])
  }
};
</script>

<style scoped >
.col {
  padding: 4px;
}
</style>
