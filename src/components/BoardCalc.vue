<template >
  <v-container>
    <v-row>
      <v-col>
        <label>Thick E / B</label>
      </v-col>
      <v-col>
        <span>{{boardProp.thick.envelope}} mm</span>
        <span> / </span>
        <span>{{ boardProp.thick.package}} cm</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>Pack - Half (round) / Full</label>
      </v-col>
      <v-col>
        <span>{{boardProp.package.half}}E ({{boardProp.package.roundHalf}})E /</span>
        <span>{{boardProp.package.full}}E</span>
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
        <span>{{ boardProp.packsOnFloor.amount}}P</span> /
        <span>{{ boardProp.packsOnFloor.maxAmount}}P</span>
      </v-col>
    </v-row>

    <!-- <div v-if="!isEqualMax"> -->
    <v-row>
      <v-col>
        <label>Last Floor</label>
      </v-col>
      <v-col>
        <span>{{ boardProp.lastFloor.fullPacks}}P + </span>
        <span>{{ boardProp.lastFloor.envelopes}}E</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label>Board -1 floor / max</label>
      </v-col>
      <v-col>
        <span>{{boardProp.totalEnvelopesOnBoard.oneFloor }}E</span> /
        <span>{{boardProp.totalEnvelopesOnBoard.maxOnBoard}}E</span>
      </v-col>
    </v-row>
    </v-container>
</template>

<script >
export default {
  name: "BoardCalc",
  props: ["boardProp", "round"],
};
</script>

<style scoped >
.col {
  padding: 4px;
}
</style>
