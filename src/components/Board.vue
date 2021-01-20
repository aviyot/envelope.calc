<template>
  <v-container>
    <Packaging />
    <v-row>
      <v-col cols="4">
        <v-text-field type="number" v-model="boardSize" label="Board" dense hide-details></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field type="number" v-model="thickness" label="P Thick" dense hide-details></v-text-field>
      </v-col>
    </v-row>


    <v-tabs v-model="componentDisplay.floorTab">
      <v-tab>{{Math.floor(calBoardFloors.floors)}}</v-tab>
      <v-tab>{{(calBoardFloors.floors).toFixed(2)}}</v-tab>
      <v-tab>{{Math.ceil(calBoardFloors.floors)}}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="componentDisplay.floorTab">
      <v-tab-item>
        <BoardCalc :boardProp="boardByFloors(Math.floor(calBoardFloors.floors),'ceil')"/>
      </v-tab-item>
      <v-tab-item>
        <BoardCalc :boardProp="boardByFloors((calBoardFloors.floors).toFixed(2),'round')"/>
      </v-tab-item>
      <v-tab-item>
        <BoardCalc :boardProp="boardByFloors(Math.ceil(calBoardFloors.floors),'ceil')"/>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BoardCalc from "./BoardCalc";
import Packaging from "./Packaging";

export default {
  name: "Board",
  components: {
    BoardCalc,
    Packaging
  },
  computed: {
    ...mapState(["componentDisplay"]),
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
      "packageThickness",
      "calcPackageFullFloor",
      "maxEnvelopesOnBoard",
      "calcPackageHeight",
      "calcEnvelopesOnBoard"
    ]),
  
     boardByFloors : function (){
       const ROUND = 5;
       return  (floor,type)=> ({
         thick : {
           envelope : this.$store.getters.packageThickness(this.$store.getters.calcPackageFullFloor(floor)),
           package : (this.$store.getters.packageThickness(this.$store.getters.calcPackageFullFloor(floor)) * (Math.ceil(floor) / 10)).toFixed(1)
         },
         package : {
           half : this.$store.getters.calcPackageFullFloor(floor),
           roundHalf: this.$store.getters.roundTo(this.$store.getters.calcPackageFullFloor(floor),ROUND,type),
           full : this.$store.getters.calcPackageFullFloor(floor)*2
         },
         packsOnFloor: {
           amount : this.$store.getters.packageAmount(this.$store.getters.calcPackageFullFloor(floor)*2).fullPackageAmount,
           maxAmount : Math.ceil(floor) * this.$store.getters.boardSize
         },
         lastFloor : {
           fullPacks : this.$store.getters.packageAmount(this.$store.getters.calcPackageFullFloor(floor)*2).fullPackageAmount % this.$store.getters.boardSize,
           envelopes : this.$store.getters.packageAmount(this.$store.getters.calcPackageFullFloor(floor)*2).lastPackageEnvelopesAmount
         },
         totalEnvelopesOnBoard: {
             oneFloor : this.$store.getters.boardSize * this.$store.getters.calcPackageFullFloor(floor)*2,
             maxOnBoard : this.$store.getters.maxEnvelopesOnBoard(Math.ceil(floor))

         }
       })
      },
       boardByPackage : () => {
       return 5;
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
.v-tab {
  min-width: 25%;
  padding: 6px;
}
</style>