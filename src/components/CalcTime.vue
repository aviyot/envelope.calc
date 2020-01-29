<template>
  <div>
    <h1>Calc</h1>
   <span>Quntity Rer Hour</span> <input v-model="z" /><br/>
    <span>Intial Quntity </span> <input v-model="x"><br/>
    <span>Total Quntity </span><input v-model="y" /><br/>
<div>
<span>Left Quntity: {{y-x}}</span>
</div>
<span>Time To Finish:</span>{{((y-(x-1))/(z/60))}}
  </div>

</template>

<script>
export default {
  name: "CalcTime",
  props: {},
  data : ()=> ({
    x:"1",
    y:500,
    z:10000,
    res:""
  }),
  methods : {
    calc : ()=>{
     
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
