<template>
  <v-app id="app">
    <v-app-bar dense>
      <v-app-bar-nav-icon v-on:click="componentDisplay.drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Envelope Calc</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="componentDisplay.drawer" absolute temporary>
      <v-list nav dense>
      <h3>Menu</h3>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <Order class="order bg-primary text-light" />
      <v-tabs v-model="componentDisplay.tab" grow >
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
      </div>-->
    </v-content>

    <v-footer class="font-weight-medium" app>
      <v-btn v-on:click="restState" color="error">RESET</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import { store } from "./store/store";
import { mapMutations, mapState } from "vuex";
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
</style>
