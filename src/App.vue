<template>
  <div id="app">
    <!-- <div class="nav">
      <a @click="toggle=false">Calc Time</a>
      <a @click="toggle =true">Calc Unit</a>
    </div>-->
    <CalcUnit/>
  </div>
</template>

<script>
import CalcTime from "./components/CalcTime";
import CalcUnit from "./components/CalcUnit";
export default {
  name: "App",
  components: {
    CalcTime,
    CalcUnit
  },
  data: function() {
    return { toggle: false };
  }
};
</script>

<style>
#app {
  background-color: lightgray;
}

input {
  min-width: 60px;
}
</style>
