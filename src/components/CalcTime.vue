<template>
  <div class="calc-app">
    <h1 style="text-align:center">Calc</h1>
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
        <th>Time(min)</th>
      </tr>
      <tr>
        <td>Total</td>
        <td>{{total}}</td>
        <td>{{(total/(rph/minute))}}min</td>
      </tr>
      <tr>
        <td>Current</td>
        <td>{{total-current}}</td>
        <td>{{((total-current)/(rph/minute))}}min</td>
      </tr>

      <tr>
        <td>Bettwen</td>
        <td>{{until - from}}</td>
        <td>{{((until - from)/(rph/minute))}}min</td>
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
    calc: () => {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  display: inline-block;
  width: 100px;
  background-color: blue;
  color: white;
  font-size: large;
}
.calc-app {
  font-size: x-large;
  background-color: lightgray;
  width: 80%;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

table {
  background-color: lightcoral;
  text-align: center;
}
</style>
