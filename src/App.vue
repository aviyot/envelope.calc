<template>
  <div id="app">
    <div class="main">
      <Order class="order"/>
       <div >
  
    <div v-on:click="toggleDisplayComp()">
      <span>Distribution </span>
    <button v-if="!componentDisplay.distribution"> Show </button>
    <button v-if="componentDisplay.distribution" > Hide </button>

  </div>
    
      <Distribution v-if="componentDisplay.distribution" class="distribution"/>
      </div>
      <Packaging class="packaing"/>
      <div class="calc-result">
        <Board class="board"/>
        <CalcTime class="calc-time"/>
      </div>
    </div>
    <button v-on:click="restState">Reset</button>
  </div>
</template>

<script>

import { store } from "./store/store";
import { mapMutations,mapState} from "vuex"
import Packaging from "./components/Packaging";
import Order from "./components/Order";
import CalcTime from "./components/CalcTime";
import Board from "./components/Board";
import Distribution from "./components/Distribution"

export default {
  store,
  name: "App",
  components: {
    Packaging,
    Order,
    CalcTime,
    Board,
    Distribution
  },
 computed : {
...mapState ([
   'componentDisplay'
])
 },
  methods: {
    ...mapMutations([
      'toggleDisplayComp'
    ]),
    restState() {
      this.$store.commit("restState");
    },

  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  }
};
</script>

<style >

.main {
  margin: 10px 10px;
  display: grid;
  grid-row-gap: 16px;
}
.calc-result {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.calc-time {
   
}

input {
max-width: 60px;
}
</style>
