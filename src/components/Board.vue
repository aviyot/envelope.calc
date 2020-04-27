<template>
  <div class="board">
    <v-row class="package-type">
      <v-col cols="3">
        <v-text-field type="number" v-model="boardSize" label="Board"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field type="number" v-model="thickness" label="P Thick"></v-text-field>
      </v-col>
      <!--   <v-col cols="6">
       <v-checkbox v-model="componentDisplay.fullFloor" label="Full F"></v-checkbox>
       <v-checkbox v-model="componentDisplay.coumputedFloor" label="Calc F"></v-checkbox>
      </v-col>-->
    </v-row>
      <v-tabs v-model="componentDisplay.floorTab">
        <!-- <v-tab>{{Math.round(calBoardFloors.floors)}}</v-tab> -->
        <v-tab>{{Math.floor(calBoardFloors.floors)}}</v-tab>
        <v-tab>{{(calBoardFloors.floors).toFixed(2)}}</v-tab>
        <v-tab>{{Math.ceil(calBoardFloors.floors)}}</v-tab>
      </v-tabs>
    <v-tabs-items v-model="componentDisplay.floorTab">
     <!--   <v-tab-item>
        <BoardCalc :floor="Math.ceil(calBoardFloors.floors)" :round ="true"/>
      </v-tab-item> -->
      <v-tab-item>
        <BoardCalc :floor="Math.floor(calBoardFloors.floors)" />
      </v-tab-item>
      <v-tab-item>
        <BoardCalc :floor="(calBoardFloors.floors).toFixed(2)" />
      </v-tab-item>
      <v-tab-item>
        <BoardCalc :floor="Math.ceil(calBoardFloors.floors)" />
      </v-tab-item>
     
      <!--    
      <v-tab-item>
        <div class="full-floors">
          <div>
            <label>Thick</label>
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
      </v-tab-item>
      <v-tab-item>
        <div class="floors">
          <div>
            <label>Thick</label>
            <span>{{thickness}}</span>
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
      </v-tab-item>
      -->
    </v-tabs-items>

    <div class="package"></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BoardCalc from "./BoardCalc";

export default {
  name: "Board",
  components: {
    BoardCalc
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
      "calcPackageFullFloor"
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

input {
  width: 40px;
}

.v-tab {
  min-width: 25%;
  padding: 6px;
}
</style>