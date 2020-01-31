<template>
  <div id="app">
    <div>
      <span @click="toggle=false">Calc Time</span>
      <span @click="toggle =true">Calc Unit</span>
    </div>
    <CalcTime v-if="!toggle"/>
    <CalcUnit v-if="toggle"/>
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
</style>
