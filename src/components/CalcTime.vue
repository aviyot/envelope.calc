<template>
<v-container>
    <v-row>
      <v-col>
        <label>Speed</label>
      </v-col>
      <v-col>
        <v-text-field type="number" v-model="speedConveyor" dense hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label>Duration</label>
      </v-col>
      <v-col>
        <span>{{durationTime}}</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>End</label>
      </v-col>
      <v-col>
        <span>{{endTime}}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
          <v-divider ></v-divider> 

      </v-col>
    </v-row>
   <v-row>
      <v-col>
        <label>Start</label>
      </v-col>
      <v-col>
        <v-text-field type="time" v-model="workTime.start" dense hide-details></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>End</label>
      </v-col>
      <v-col>
        <v-text-field type="time" v-model="workTime.end" dense hide-details></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>Total</label>
      </v-col>
      <v-col>
        <span>{{getTime.hour}}:{{getTime.minute}}</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>Amount</label>
      </v-col>
      <v-col>
        <span>{{envelopesPerTime}}</span>
      </v-col>
    </v-row>
</v-container>
</template>

<script>
import moment from "moment";
import "moment-duration-format";
import { mapState, mapGetters } from "vuex";
export default {
  name: "CalcTime",
  methods: {},
  computed: {
    ...mapGetters(["getTime", "envelopesPerTime"]),
    ...mapState({
      workTime: "machine"
    }),
    speedConveyor: {
      get() {
        return this.$store.state.machine.speedConveyor;
      },
      set(value) {
        this.$store.commit("updateSpeedConveyor", value);
      }
    },
    durationMinute: function() {
      const MINUTE = 60;
      return (
        this.$store.getters.envelopesBetweenAmount /
        (this.speedConveyor / MINUTE)
      );
    },
    durationTime: function() {
      return moment
        .duration(Math.round(this.durationMinute), "minutes")
        .format("hh:mm:ss");
    },
    endTime: function() {
      return moment()
        .add(this.durationMinute, "minutes")
        .format("HH:mm:ss");
    },
    envelopePerMinute: function() {
      return (this.speedConveyor / 60).toFixed(1);
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.col {
  padding: 4px;
}
</style>
