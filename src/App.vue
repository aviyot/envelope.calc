<template>
  <v-app id="app">
    <v-app-bar max-height="56px">
      <v-app-bar-nav-icon
        v-on:click="componentDisplay.drawer = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Envelope Calc</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="componentDisplay.drawer" absolute temporary>
      <v-list nav dense>
        <v-divider></v-divider>
        <v-list-item>
          <v-icon large v-on:click="toogleTheme">mdi-palette</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-btn v-on:click="restState" color="error">RESET</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-tabs v-model="componentDisplay.tab" grow>
        <v-tab>Order</v-tab>
        <v-tab>PACK</v-tab>
        <v-tab>prod</v-tab>
      </v-tabs>
      <v-tabs-items v-model="componentDisplay.tab">
        <v-tab-item>
          <Order />
        </v-tab-item>
        <v-tab-item>
          <Board class="board" />
        </v-tab-item>
        <v-tab-item>
          <OnlineProd />
          <v-btn v-on:click="togleShowCalcs">
            <span v-if="!showCalcs"> show calcs</span>
            <span v-if="showCalcs">hide calcs</span>
          </v-btn>
          <div v-if="showCalcs">
            <v-tabs v-model="componentDisplay.prodTab" grow>
              <v-tab>amount</v-tab>
              <v-tab>time</v-tab>
              <v-tab>speed</v-tab>
            </v-tabs>
            <v-tabs-items v-model="componentDisplay.prodTab">
              <v-tab-item> <AmountCalc class="calc-time" /> </v-tab-item>
              <v-tab-item> <TimeCalc class="calc-time" /> </v-tab-item>
              <v-tab-item> <SpeedCalc class="calc-time" /> </v-tab-item>
              <v-tab-item></v-tab-item>
            </v-tabs-items>
          </div>
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
  </v-app>
</template>

<script>
import { store } from "./store/store";
import { mapMutations, mapState } from "vuex";
import Board from "./components/Board";
import AmountCalc from "./components/AmountCalc.vue";
import SpeedCalc from "./components/SpeedCalc.vue";
import TimeCalc from "./components/TimeCalc.vue";
import OnlineProd from "./components/OnlineProd.vue";
import Order from "./components/Order.vue";

export default {
  store,
  data() {
    return {
      tab: null,
      showCalcs: false,
    };
  },
  name: "App",
  components: {
    Board,
    AmountCalc,
    SpeedCalc,
    TimeCalc,
    OnlineProd,
    Order,
  },
  computed: {
    ...mapState(["componentDisplay", "prodTab"]),
  },
  methods: {
    ...mapMutations(["toggleDisplayComp"]),
    restState() {
      this.$store.commit("restState");
    },
    togleShowCalcs() {
      this.showCalcs = !this.showCalcs;
    },
    toogleTheme() {
      if (this.$vuetify.theme.dark) this.$vuetify.theme.dark = false;
      else this.$vuetify.theme.dark = true;
    },
  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
};
</script>

<style >
</style>
