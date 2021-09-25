<template>
  <v-container>
    <v-card class="mt-5">
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
          <v-col cols="4">
            <v-text-field
              type="time"
              label="Total Time"
              v-model="totalTime"
              hide-details
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              type="time"
              label="Start Time"
              v-model="startTime"
              v-on:focus="onStartTimeFocus('start')"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              type="time"
              label="End Time"
              v-model="endTime"
              v-on:focus="onStartTimeFocus('end')"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "TimeCalc",
  methods: {
    onStartTimeFocus(type) {
      this.$store.commit("updateTimeCalcTimeUpdate", type);
    },
    onAmountFocus(type) {
      this.$store.commit("updateTimeCalcAmountUpdate", type);
    },
  },
  computed: {
    speed: {
      get() {
        return this.$store.state.timeCalc.speed;
      },
      set(value) {
        this.$store.commit("updateTimeCalcSpeed", value);
      },
    },
    startTime: {
      get() {
        return this.$store.state.timeCalc.startTime;
      },
      set(value) {
        this.$store.commit("updateTimeCalcStartTime", value);
      },
    },
    endTime: {
      get() {
        return this.$store.state.timeCalc.endTime;
      },
      set(value) {
        this.$store.commit("updateTimeCalcEndTime", value);
      },
    },
    totalTime: {
      get() {
        if (this.$store.state.timeCalc.timeUpdate === "start") {
          this.$store.commit(
            "updateTimeCalcEndTime",
            this.$store.getters.addTimes(
              this.$store.getters.calcTime,
              this.$store.state.timeCalc.startTime
            )
          );
        }
        if (this.$store.state.timeCalc.timeUpdate === "end") {
          this.$store.commit(
            "updateTimeCalcStartTime",
            this.$store.getters.subTimes(
              this.$store.getters.calcTime,
              this.$store.state.timeCalc.endTime
            )
          );
        }

        return this.$store.getters.calcTime;
      },
    },
    fromAmount: {
      get() {
        return this.$store.state.timeCalc.fromAmount;
      },
      set(value) {
        this.$store.commit("updateTimeCalcFromAmount", value);
        this.$store.commit(
          "updateTimeCalcTotalAmount",
          +this.$store.state.timeCalc.untilAmount -
            +this.$store.state.timeCalc.fromAmount +
            1
        );
      },
    },
    untilAmount: {
      get() {
        return this.$store.state.timeCalc.untilAmount;
      },
      set(value) {
        this.$store.commit("updateTimeCalcUntilAmount", value);
        this.$store.commit(
          "updateTimeCalcTotalAmount",
          +this.$store.state.timeCalc.untilAmount -
            +this.$store.state.timeCalc.fromAmount +
            1
        );
      },
    },
    totalAmount: {
      get() {
        return this.$store.state.timeCalc.totalAmount;
      },
      set(value) {
        this.$store.commit("updateTimeCalcTotalAmount", value);
        if (this.$store.state.timeCalc.amountUpdate === "from") {
          this.$store.commit(
            "updateTimeCalcUntilAmount",
            +this.$store.state.timeCalc.totalAmount +
              +this.$store.state.timeCalc.fromAmount -
              1
          );
        }
        if (this.$store.state.timeCalc.amountUpdate === "until") {
          this.$store.commit(
            "updateTimeCalcFromAmount",
            +this.$store.state.timeCalc.untilAmount -
              +this.$store.state.timeCalc.totalAmount +
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
