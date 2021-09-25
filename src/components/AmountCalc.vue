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
              disabled
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
              v-model="untilAmount"
              v-on:focus="onAmountFocus('until')"
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
  name: "AmountCalc",
  methods: {
    onStartTimeFocus(type) {
      this.$store.commit("updateAmountCalcTimeUpdate", type);
    },
    onAmountFocus(type) {
      this.$store.commit("updateAmountCalcAmountUpdate", type);
    },
  },
  computed: {
    speed: {
      get() {
        return this.$store.state.amountCalc.speed;
      },
      set(value) {
        this.$store.commit("updateAmountCalcSpeed", value);
      },
    },
    startTime: {
      get() {
        return this.$store.state.amountCalc.startTime;
      },
      set(value) {
        this.$store.commit("updateAmountCalcStartTime", value);
      },
    },
    endTime: {
      get() {
        return this.$store.state.amountCalc.endTime;
      },
      set(value) {
        this.$store.commit("updateAmountCalcEndTime", value);
      },
    },
    totalTime: {
      get() {
        return this.$store.getters.hourMinuteFormat(
          this.$store.state.amountCalc.startTime,
          this.$store.state.amountCalc.endTime
        );
      },
      set(value) {
        this.$store.commit("updateAmountCalcTotalTime", value);

        if (this.$store.state.amountCalc.timeUpdate === "start") {
          this.$store.commit(
            "updateAmountCalcStartTime",
            this.$store.getters.subTimes(
              this.$store.state.amountCalc.totalTime,
              this.$store.state.amountCalc.endTime
            )
          );
        }
        if (this.$store.state.amountCalc.timeUpdate === "end") {
          this.$store.commit(
            "updateAmountCalcEndTime",
            this.$store.getters.addTimes(
              this.$store.state.amountCalc.totalTime,
              this.$store.state.amountCalc.startTime
            )
          );
        }
      },
    },
    fromAmount: {
      get() {
        return this.$store.state.amountCalc.fromAmount;
      },
      set(value) {
        this.$store.commit("updateAmountCalcFromAmount", value);
        /*    this.$store.commit(
          "updateAmountCalcUntilAmount",
          +this.$store.getters.amountPerTimeCalcAmount +
            +this.$store.state.amountCalc.fromAmount -
            1
        ); */
      },
    },
    untilAmount: {
      get() {
        return this.$store.state.amountCalc.untilAmount;
      },
      set(value) {
        this.$store.commit("updateAmountCalcUntilAmount", value);
        /*     this.$store.commit(
          "updateAmountCalcFromAmount",
          +this.$store.state.amountCalc.untilAmount -
            +this.$store.getters.amountPerTimeCalcAmount +
            1
        ); */
      },
    },
    totalAmount: {
      get() {
        let _totalAmount = this.$store.getters.amountPerTime(
          this.$store.state.amountCalc.startTime,
          this.$store.state.amountCalc.endTime,
          this.$store.state.amountCalc.speed
        );
        if (this.$store.state.amountCalc.amountUpdate === "from") {
          this.$store.commit(
            "updateAmountCalcUntilAmount",
            +this.$store.state.amountCalc.fromAmount + +_totalAmount - 1
          );
        }
        if (this.$store.state.amountCalc.amountUpdate === "until") {
          this.$store.commit(
            "updateAmountCalcFromAmount",
            +this.$store.state.amountCalc.untilAmount - +_totalAmount + 1
          );
        }

        return _totalAmount;
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
