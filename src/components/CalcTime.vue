<template>
  <div class="calc-app">
    <!-- <h1 style="text-align:center">Calc</h1> -->
    <div class="data">
      <span>Speed(RPH) :</span>
      <input v-model="rph" type="number">
      <br>
      <span>Total :</span>
      <input v-model="total" type="number">
      <br>
      <span>Current:</span>
      <input v-model="current" type="number">
      <div>
        <span>from :</span>
        <input type="number" v-model="from">
        <br>
        <span>
          Until :
          <input type="number" v-model="until">
        </span>
      </div>
    </div>
    <table>
      <tr>
        <th></th>
        <th>Quntity</th>
        <th>Time</th>
      </tr>
      <tr>
        <td>Total</td>
        <td>{{total}}</td>
        <td>{{(calc(0,total,rph,minute))}}m</td>
      </tr>
      <tr>
        <td>Current</td>
        <td>{{total-current}}</td>
        <td>{{(calc(current,total,rph,minute))}}m</td>
      </tr>

      <tr>
        <td>Bettwen</td>
        <td>{{until - from}}</td>
        <td>{{(calc(from,until,rph,minute))}}m</td>

        <!-- <td>{{((until - from)/(rph/minute)).toFixed(2)}}m</td> -->
      </tr>
    </table>
    <!--     <span>Time Total:</span>
    {{(total/(rph/minute))}}min
    <br>
    <br>

    <span>Left Quntity: {{total-current}}</span>
    <br>

    <span>Left Time :</span>
    {{((current)/(rph/minute))}}min
    <br>
    <br>

    <span>Quntity Until Current:</span>
    {{total-current}}
    <br>
    <span>Time Until Current:</span>
    {{((total-current)/(rph/minute))}}min
    <br>
    <br>

    <span>Quntity from - until:</span>
    {{until - from}}
    <br>
    <span>Time from - until:</span>
    {{((until - from)/(rph/minute))}}min-->
  </div>
</template>

<script>
export default {
  name: "CalcTime",
  props: {},
  data: () => ({
    total: 10000,
    rph: 10000,
    from: 500,
    until: 700,
    current: 5000,
    intialRPR: 10000,
    minute: 60
  }),
  methods: {
    calc: (f, e, r, m) => {
      let result = (e - f) / (r / m);

      if(Number.isInteger(result))
         return result
      else
        return result.toFixed(1)
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
input {
  display: inline-block;
  width: 80px;
  background-color: blue;
  color: white;
  font-size: large;
}
.calc-app {
  font-size: large;
  padding-left: 8px;
}

table {
  background-color: lightcoral;
  text-align: center;
  font-size: large;
}
</style>
