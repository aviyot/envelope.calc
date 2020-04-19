<template>
  <v-app id="app">
  <v-container> 
      {{componentDisplay.tab}}
      <Order class="order bg-primary text-light" />
      <Packaging class="packaing" />
      <v-tabs v-model="componentDisplay.tab" grow>
        <v-tab>Dist</v-tab>
        <v-tab>PACKAGE</v-tab>
        <v-tab>time</v-tab>
      </v-tabs>
      <v-tabs-items v-model="componentDisplay.tab">
        <v-tab-item>
          <Distribution class="distribution" />
        </v-tab-item>
        <v-tab-item>
          <Board class="board" />
        </v-tab-item>
        <v-tab-item>
          <CalcTime class="calc-time" />
        </v-tab-item>
      </v-tabs-items>
  

<!--       <div>
        <div>
          <span>Distribution</span>
          <button
            v-on:click="toggleDisplayComp()"
            v-if="!componentDisplay.distribution"
            class="btn"
          >Show</button>
          <button
            v-on:click="toggleDisplayComp()"
            v-if="componentDisplay.distribution"
            class="btn"
          >Hide</button>
        </div>

        <Distribution v-if="componentDisplay.distribution" class="distribution" />
      </div>
      <Packaging class="packaing" />
      <div class="calc-result">
        <Board class="board" />
        <CalcTime class="calc-time" />
      </div> -->
    </v-container> 
    <button v-on:click="restState">Reset</button>
  </v-app>
</template>

<script>
import { store } from "./store/store";
import { mapMutations, mapState } from "vuex";
import Packaging from "./components/Packaging";
import Order from "./components/Order";
import CalcTime from "./components/CalcTime";
import Board from "./components/Board";
import Distribution from "./components/Distribution";

export default {
  store,
  data() {
    return {
      tab: null
    };
  },
  name: "App",
  components: {
    Packaging,
    Order,
    CalcTime,
    Board,
    Distribution
  },
  computed: {
    ...mapState(["componentDisplay"])
  },
  methods: {
    ...mapMutations(["toggleDisplayComp"]),
    restState() {
      this.$store.commit("restState");
    }
  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  }
};
</script>

<style >
/* .main {
  margin: 10px 10px;
  display: grid;
  grid-row-gap: 16px;
} */
.calc-result {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

body {
  font-size: 16px;
}

input {
  max-width: 60px;
}
</style>
