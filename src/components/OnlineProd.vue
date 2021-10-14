<template>
  <v-container>
    <v-card>
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
      <v-btn v-on:click="wakeLockScreen()">screen:{{ wakeLockStatus }}</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "OnlineProd",
  data: function () {
    return {
      wakeLock: null,
      wakeLockStatus: "off",
    };
  },
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
        if (this.$store.state.prod.start) this.resumeProd();
      },
    },
    speed: {
      get() {
        return this.$store.state.prod.speed;
      },
      set(value) {
        this.$store.commit("updateSpeedProd", value);
        if (this.$store.state.prod.start) this.resumeProd();
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
    async wakeLockScreen() {
      if ("wakeLock" in navigator) {
        document.addEventListener("visibilitychange", async () => {
          if (
            this.wakeLock !== null &&
            document.visibilityState === "visible"
          ) {
            this.wakeLock = await navigator.wakeLock.request("screen");
          }
        });
        if (!this.wakeLock) {
          try {
            this.wakeLock = await navigator.wakeLock.request("screen");
            this.wakeLockStatus = "on";
          } catch (err) {
            alert("wake screen inabled");
          }
        } else {
          this.wakeLock.release().then(() => {
            this.wakeLock = null;
            this.wakeLockStatus = "off";
          });
        }
      } else {
        alert("wakeLock not support");
      }
    },
  },
};
</script>
<style scoped>
</style>