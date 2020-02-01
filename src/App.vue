<template>
  <div id="app">
    <div class="nav">
      <a @click="toggle=false">Calc Time</a>
      <a @click="toggle =true">Calc Unit</a>
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

.nav {
  display: flex;
  font-size: x-large;
  
}

.nav a {
margin: 10px;
}

.two-column-grid {
display: grid;
grid-template-columns: 2fr 1fr;
}
</style>
