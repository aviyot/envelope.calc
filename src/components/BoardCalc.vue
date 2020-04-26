<template >
  <div >
    <v-row>
      <v-col><label>Thick</label></v-col>
      <v-col><span>{{packageThickness(calcPackageFullFloor(floor))}}</span></v-col>
    </v-row>
    

    <v-row>
      <v-col><label>Pack - Half / Full </label></v-col>
      <v-col><span>{{calcPackageFullFloor(floor)}} /</span> 
      <span>{{calcPackageFullFloor(floor)*2}}</span> </v-col>
    </v-row>

   <!--  <v-row>
      <v-col><label>1 pack</label></v-col>
      <v-col><span>{{calcPackageFullFloor(floor)*2}}</span></v-col>
    </v-row>
 -->
    <v-row>
      <v-col><label>No.Pack</label></v-col>
      <v-col>
        <span>{{packageAmount(calcPackageFullFloor(floor)*2).fullPackageAmount}}</span> / 
        <span>{{ Math.ceil(floor) * boardSize}}</span>
        
        </v-col>
    </v-row>

    <!-- <div v-if="!isEqualMax"> -->
    <v-row>
      <v-col><label>Last Floor</label></v-col>
      <v-col>
        <span> {{packageAmount(calcPackageFullFloor(floor)*2).fullPackageAmount % boardSize}} / </span>
        <span>{{packageAmount(calcPackageFullFloor(floor)*2).lastPackageEnvelopesAmount}}</span>
      
        </v-col>
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
  props: ["floor","round"],


  computed: {

    ...mapGetters([
      'calcPackageFullFloor',
      'packageThickness',
      'packageAmount',
      'maxEnvelopesOnBoard',
      'boardSize',
      'calBoardFloors',
      'roundTo'
    ])
  }
};
</script>

<style scoped >
.col {
  padding : 4px;
}
</style>
