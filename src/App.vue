<template>
  <div id="app">
    <CalcTime/>
  </div>
</template>

<script>
import CalcTime from "./components/CalcTime";

export default {
  name: "App",
  components: {
    CalcTime
  }
};
</script>

<style>
#app {
  background-color: lightgray;
   padding-left: 20px;
  padding-right: 20px;
}
</style>
