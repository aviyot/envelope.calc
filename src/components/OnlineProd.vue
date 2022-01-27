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
      <v-row>
        <v-col>
          <v-text-field
            type="number"
            label="Update Current"
            v-model="updateValue"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn v-on:click="updateCurrent()">update current</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>{{ durationTime }}</v-col>
        <v-col>{{ endTime | time_hms }}</v-col>
        <v-col></v-col>
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
      updateValue: 0,
      durationTime: "",
      endTime: "",
      interval: null,
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
      this.calcEndTime();
    },
    stopProd() {
      this.$store.commit("stopProd");
      clearInterval(this.interval);
    },
    resumeProd() {
      this.$store.commit("startProd", {
        speed: this.$store.state.prod.speed,
        intialProd: this.$store.state.prod.currentProd,
      });
      this.calcEndTime();
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
    updateCurrent() {
      this.$store.commit("startProd", {
        speed: this.$store.state.prod.speed,
        intialProd: this.updateValue,
      });
      this.calcEndTime();
    },
    calcEndTime() {
      const MINUTE = 60;
      const MILISECOND = 1000;
      const MINUTE_SPEED = this.speed / MINUTE;
      const SECOND_SPEED = this.speed / (MINUTE * MINUTE);
      let startTime = new Date().getTime();
      this.endTime = new Date();
      let totalAmount = this.currentProd;
      let speed = this.speed;

      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      let leftAmount = 0;

      leftAmount = totalAmount % speed;
      hours = Math.trunc(totalAmount / speed);

      minutes = Math.trunc(leftAmount / MINUTE_SPEED);
      leftAmount = leftAmount % MINUTE_SPEED;

      seconds = Math.trunc(leftAmount / SECOND_SPEED);

      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      this.durationTime = hours + ":" + minutes + ":" + seconds;

      let endTimeMilisescond =
        startTime +
        (MINUTE * MINUTE * +hours + MINUTE * +minutes + +seconds) * MILISECOND;
      this.endTime = new Date(endTimeMilisescond);

      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        totalAmount = this.currentProd;
        speed = this.speed;
        leftAmount = totalAmount % speed;
        hours = Math.trunc(totalAmount / speed);

        minutes = Math.trunc(leftAmount / MINUTE_SPEED);
        leftAmount = leftAmount % MINUTE_SPEED;

        seconds = Math.trunc(leftAmount / SECOND_SPEED);

        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        this.durationTime = hours + ":" + minutes + ":" + seconds;
      }, 200);
    },
  },
  filters: {
    time_hms: function (value) {
      const date = new Date(value);
      if (!value) return "";
      else {
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        if (h < 10) h = "0" + h;
        if (m < 10) m = "0" + m;
        if (s < 10) s = "0" + s;
        return h + ":" + m + ":" + s;
      }
    },
  },
};
</script>
<style scoped>
</style>