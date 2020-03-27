<template>
  <div class="calc-app">
    <div>
        <div class="time-title">TIME</div>
        <div class="speed-time">
        <label>Speed(RPH)</label>
        <input v-model="speedConveyor" type="number">
        </div>
        <div>Duration : {{durationTime}}</div>
        <div>End : {{endTime}}</div>
       <div>1 minute : {{envelopePerMinute}}En</div>
        
      </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment-duration-format";

export default {
  name: "CalcTime",
  computed: {
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
      let orderFrom = this.$store.state.board.orderFrom;
      let orderUntil = this.$store.state.board.orderUntil;
      let minuteDuration =
        (orderUntil - orderFrom) / (this.speedConveyor / MINUTE);
      return minuteDuration;
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
    envelopePerMinute :function(){
      const MINUTE = 60;

      return  (this.speedConveyor/MINUTE).toFixed(1);
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.data {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.time input {
  max-width: 20px;
}

.time {
  background-color: blue;
  color: white;
}

.speed-time{
  display: grid;
grid-template-columns: 2fr 1fr;
}
</style>
