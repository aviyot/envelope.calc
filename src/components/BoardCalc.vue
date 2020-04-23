<template >
  <div>
    <v-row>
      <v-col><span>Floors</span></v-col>
      <v-col><label>{{floor}}</label></v-col>
    </v-row>
    <v-row>
      <v-col><label>Thick</label></v-col>
      <v-col><span>{{packageThickness(calcPackageFullFloor(floor))}}</span></v-col>
    </v-row>
    

    <v-row>
      <v-col><label>0.5 pack</label></v-col>
      <v-col><span>{{calcPackageFullFloor(floor)}}</span></v-col>
    </v-row>

    <v-row>
      <v-col><label>1 pack</label></v-col>
      <v-col><span>{{calcPackageFullFloor(floor)*2}}</span></v-col>
    </v-row>

    <v-row>
      <v-col><label>No.Pack</label></v-col>
      <v-col><span>{{packageAmount(calcPackageFullFloor(floor)*2).fullPackageAmount}}</span></v-col>
    </v-row>

    <!-- <div v-if="!isEqualMax"> -->
    <v-row>
      <v-col><label>Last Pack</label></v-col>
      <v-col><span>{{packageAmount(calcPackageFullFloor(floor)*2).lastPackageEnvelopesAmount}}</span></v-col>
    </v-row>
    <v-row>
      <v-col><label>Max Board</label></v-col>
      <v-col><span>{{maxEnvelopesOnBoard(Math.ceil(floor))}}</span></v-col>
    </v-row>
  </div>
</template>

<script >

import {mapGetters} from "vuex"
export default {
  name: "BoardCalc",
  props: ["floor"],


  computed: {

    ...mapGetters([
      'calcPackageFullFloor',
      'packageThickness',
      'packageAmount',
      'maxEnvelopesOnBoard'
    ])
  }
};
</script>

<style scoped >
.col {
  padding : 4px;
}
</style>
