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
      <span>Time : {{(calc(from,until,rph,minute))}}m</span>
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
    calc: (f, e, r, m) => {
      let result = (f - e) / (r / m);

      if (Number.isInteger(result)) return result;
      else return result.toFixed(1);
      /*  
      //let h = result / 60;
      let hour = result % 60;
      if (result >= 1 && min) {
        return result.toFixed(2);
      } else if (min) {
        return result.toFixed();
      } else {
        return min;
      } */
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
