<template>
  <div class="calc-app">
    <!-- <h1 style="text-align:center">Calc</h1> -->
    <div class="data">
      <label>Speed(RPH)</label>
      <input v-model="rph" type="number">
      <label>From</label>
      <input type="number" v-model="from">
      <label>Until</label>
      <input type="number" v-model="until">
    </div>
    <div>
      <span>Amount : {{from-until + 1}}</span>
      <br>
      <span>Time : {{(calcTime(from,until,rph,minute))}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalcTime",
  props: {},
  data: () => ({
    rph: 10000,
    from: 10000,
    until: 1,
    intialRPR: 10000,
    minute: 60
  }),
  methods: {
    calcTime: (f, e, r, m) => {
      let result = (f - e) / (r / m);

      let hr = Math.floor(result/60);
      let min  = result % 60;

      hr = hr < 10 ? '0' + hr : hr;
      min = min < 10 ? '0' + min.toFixed() : min.toFixed();

      return `${hr}h:${min}m`

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
</style>
