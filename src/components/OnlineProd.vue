<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          type="number"
          label="Speed"
          step="500"
          v-model="speed"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          type="number"
          label="total"
          v-model="intialProd"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          type="number"
          label="Current"
          v-model="currentProd"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn-toggle dense group>
      <v-btn v-on:click="startProd()">start</v-btn>
      <v-btn v-on:click="stopProd()">stop</v-btn>
      <v-btn v-on:click="resumeProd()">resume</v-btn>
    </v-btn-toggle>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "OnlineProd",
  components: {},
  computed: {
    ...mapState(["componentDisplay"]),
    ...mapGetters([]),
    currentProd: {
      get() {
        return this.$store.state.prod.currentProd;
      },
      set(value) {
        this.$store.commit("updateCurrentProd", value);
      },
    },
    intialProd: {
      get() {
        return this.$store.state.prod.intialProd;
      },

      set(value) {
        this.$store.commit("updateIntialProd", value);
        this.resumeProd();
      },
    },
    speed: {
      get() {
        return this.$store.state.prod.speed;
      },
      set(value) {
        this.$store.commit("updateSpeedProd", value);
        this.resumeProd();
      },
    },
  },
  methods: {
    startProd() {
      this.$store.commit("startProd", {
        speed: this.$store.state.prod.speed,
        intialProd: this.$store.state.prod.intialProd,
      });
    },
    stopProd() {
      this.$store.commit("stopProd");
    },
    resumeProd() {
      this.$store.commit("startProd", {
        speed: this.$store.state.prod.speed,
        intialProd: this.$store.state.prod.currentProd,
      });
    },
  },
};
</script>
<style scoped>
</style>