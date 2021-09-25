<template>
  <v-container>
    <v-card class="mt-5">
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-text-field
              type="time"
              label="Total Time"
              v-model="totalTime"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              type="time"
              label="Start Time"
              v-model="startTime"
              hide-details
              v-on:focus="onStartTimeFocus('end')"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              type="time"
              label="End Time"
              v-model="endTime"
              v-on:focus="onStartTimeFocus('start')"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              type="number"
              label="Total"
              v-model="totalAmount"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              label="From"
              v-model="fromAmount"
              v-on:focus="onAmountFocus('from')"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              label="Until"
              v-on:focus="onAmountFocus('until')"
              v-model="untilAmount"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              type="number"
              label="Speed"
              step="500"
              v-model="speed"
              hide-details
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SpeedCalc",
  methods: {
    onStartTimeFocus(type) {
      this.$store.commit("updateSpeedCalcTimeUpdate", type);
    },
    onAmountFocus(type) {
      this.$store.commit("updateSpeedCalcAmountUpdate", type);
    },
  },
  computed: {
    speed: {
      get() {
        return this.$store.getters.calcSpeed(
          this.$store.state.speedCalc.totalAmount,
          this.$store.state.speedCalc.totalTime
        );
      },
    },
    startTime: {
      get() {
        return this.$store.state.speedCalc.startTime;
      },
      set(value) {
        this.$store.commit("updateSpeedCalcStartTime", value);
      },
    },
    endTime: {
      get() {
        return this.$store.state.speedCalc.endTime;
      },
      set(value) {
        this.$store.commit("updateSpeedCalcEndTime", value);
      },
    },
    totalTime: {
      get() {
        return this.$store.getters.hourMinuteFormat(
          this.$store.state.speedCalc.startTime,
          this.$store.state.speedCalc.endTime
        );
      },
      set(value) {
        this.$store.commit("updateSpeedCalcTotalTime", value);
        if (this.$store.state.speedCalc.timeUpdate === "start") {
          this.$store.commit(
            "updateSpeedCalcStartTime",
            this.$store.getters.subTimes(
              this.$store.state.speedCalc.totalTime,
              this.$store.state.speedCalc.endTime
            )
          );
        }
        if (this.$store.state.speedCalc.timeUpdate === "end") {
          this.$store.commit(
            "updateSpeedCalcEndTime",
            this.$store.getters.addTimes(
              this.$store.state.speedCalc.totalTime,
              this.$store.state.speedCalc.startTime
            )
          );
        }
      },
    },
    fromAmount: {
      get() {
        return this.$store.state.speedCalc.fromAmount;
      },
      set(value) {
        this.$store.commit("updateSpeedCalcFromAmount", value);
      },
    },
    untilAmount: {
      get() {
        return this.$store.state.speedCalc.untilAmount;
      },
      set(value) {
        this.$store.commit("updateSpeedCalcUntilAmount", value);
      },
    },
    totalAmount: {
      get() {
        return (
          +this.$store.state.speedCalc.untilAmount -
          +this.$store.state.speedCalc.fromAmount +
          1
        );
      },
      set(value) {
        this.$store.commit("updateSpeedCalcTotalAmount", value);
        /*      this.$store.commit("updateSpeedCalcUntilAmount", value);
        this.$store.commit("updateSpeedCalcFromAmount", 1); */
        if (this.$store.state.speedCalc.amountUpdate === "from") {
          this.$store.commit(
            "updateSpeedCalcUntilAmount",
            +this.$store.state.speedCalc.totalAmount +
              +this.$store.state.speedCalc.fromAmount -
              1
          );
        }
        if (this.$store.state.speedCalc.amountUpdate === "until") {
          this.$store.commit(
            "updateSpeedCalcFromAmount",
            +this.$store.state.speedCalc.untilAmount -
              +this.$store.state.speedCalc.totalAmount +
              1
          );
        }
      },
    },
  },
};
</script>

<style scoped>
.col {
  padding: 4px;
}
</style>
