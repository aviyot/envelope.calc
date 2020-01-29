<template>
  <div id="app">
    <HelloWorld/>
    <CalcTime/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import CalcTime from "./components/CalcTime";

export default {
  name: "App",
  components: {
    HelloWorld,
    CalcTime
  }
};
</script>

<style>

</style>
