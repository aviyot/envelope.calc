<template>
  <div class="calc-app">
    <!-- <h1 style="text-align:center">Calc</h1> -->
    <div class="data">
      <label>From</label>
      <input type="number" v-model="from">
      <label>Until</label>
      <input type="number" v-model="until">
    </div>
    <div>
      <span>Amount : {{from-until + 1}}</span>
      <br>
     <div class="time">
      <br/>
      <div class="time-title">TIME</div>
      <label>Speed(RPH)</label>
      <input v-model="rph" type="number">
      <span>Duration : {{(calcTime(from,until,rph,minute))}}</span>
      <br>
      <span>End : {{endTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment-duration-format";

export default {
  name: "CalcTime",
  props: {},
  data: () => ({
    rph: 10000,
    from: 10000,
    until: 1,
    intialRPR: 10000,
    minute: 60,
    endTime: 0
  }),
  methods: {
    calcTime: function(f, e, r, m) {
      let result = (f - e) / (r / m);
      const dr = moment.duration(Math.round(result), "minutes");

      this.endTime = moment()
        .add(result, "minutes")
        .format("HH:mm:ss");
    //  return `${dr.asHours()}h:${dr.asMinutes()}m`;
    return dr.format("hh:mm:ss")
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

.time-title{
text-align: center;
}
</style>
