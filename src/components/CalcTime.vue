<template>
  <div class="calc-app">
    <div>
      <div class="speed-time">
        <label>Speed</label>
        <input v-model="speedConveyor" type="number">
        <label>Duration</label>
        <span>{{durationTime}}</span>
        <label>End</label>
        <span>{{endTime}}</span>
        <label>Start </label>
        <input type="text" v-model="workTime.start" placeholder="hh:mm">
        <label>End </label>
        <input type="text" v-model="workTime.end" placeholder="hh:mm">
       <label>Total</label>
       <span>{{getTime.hour}}:{{getTime.minute}}</span>
       <label>Amount </label>
       <span>{{envelopesPerTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment-duration-format";
import { mapState, mapGetters} from "vuex";
export default {
  name: "CalcTime",
  methods:{

  },
  computed: {
 ...mapGetters([
  'getTime',
  'envelopesPerTime'
 ]),
...mapState({
   workTime:'machine'
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
.data {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.time input {
  max-width: 20px;
}

.time {
  background-color: blue;
  color: white;
}

.speed-time {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
input {
  max-width: 60px;
}
</style>
