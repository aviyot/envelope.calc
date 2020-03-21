 <style>
.input-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: yellowgreen;
}

.clac-result span {
  display: block;
}

.clac-result {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.clac-result input {
  max-width: 20px;
}

.time-unit {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
<template>
  <div class="calc-unit">
    <div class="time-unit">
      <div class="input-section">
        <span>Envelopes</span>
        <input type="number" v-model="envelopesAmount">
        <span>Invoices</span>
        <input type="number" v-model="invoicesAmount">
        <span>Zruphot</span>
        <input type="number" v-model="zruphotAmount">
        <span>Zruphot Pages</span>
        <input type="number" v-model="zruphotPages">
        <span>Thickness(cm)</span>
        <input type="number" v-model="thickness">
        <label>Size Board</label>
        <input type="number" v-model="boardSize">
      </div>
      <CalcTime/>
    </div>
    <div class="clac-result">
      <button v-on:click = "setEnv">Commit</button>
      <div>
        <h4>Cumputed</h4>
        <span>Half Size : {{envelopesUnitAmount}}</span>
        <span>One floor : {{boardSize * envelopesUnitAmount* 2}}</span>
        <span>Floors : {{(envelopesAmount/(boardSize * envelopesUnitAmount*2)) | fixed(1)}}</span>
        <span>For {{floors(envelopesUnitAmount)}} floors :{{Math.ceil(envelopesAmount/(floors(envelopesUnitAmount)*boardSize*2))}}</span>
        <span>Max : {{floors(envelopesUnitAmount)*boardSize*2*Math.ceil(envelopesAmount/(floors(envelopesUnitAmount)*boardSize*2))}} </span>
      </div>
      <div>
       <!--  <h4>Manual</h4>
        <label>half Size :</label>
        <input type="number" v-model="manualUnitSize">
        <span>1 floor : {{boardSize * manualUnitSize*2}}</span>
        <span>Floors : {{(envelopesAmount/(boardSize * manualUnitSize*2)) | fixed(2)}}</span>
      <span>For {{floors(manualUnitSize)}} floors :{{Math.ceil(envelopesAmount/(floors(manualUnitSize)*boardSize*2))}}</span>
      <span>Max : {{floors(manualUnitSize)*boardSize*2*Math.ceil(envelopesAmount/(floors(manualUnitSize)*boardSize*2))}} </span>
 -->      
  <h4>Manual</h4>
        <label>half Size :</label>
        <input type="number" v-model="manualUnitSize">
        <span>1 floor : {{boardSize * manualUnitSize*2}}</span>
        <span>Floors : {{(envelopesAmount/(boardSize * manualUnitSize*2)) | fixed(2)}}</span>
      <span>For {{floors(manualUnitSize)}} floors :{{Math.ceil(envelopesAmount/(floors(manualUnitSize)*boardSize*2))}}</span>
      <span>Max : {{floors(manualUnitSize)*boardSize*2*Math.ceil(envelopesAmount/(floors(manualUnitSize)*boardSize*2))}} </span>


      </div>
    </div>
  </div>
</template>
<script>
import CalcTime from "./CalcTime";
export default {
  name: "CalcUnit",
  components: {
    CalcTime
  },
 updated(){
       console.log(this.sizeOnRange(8000,4000))
 },
  data: () => ({
    envelopesAmount: 10000,
    invoicesAmount: 10000,
    zruphotAmount: 0,
    zruphotPages: 1,
    pagesToUnit: 8,
    thickness: 7.4,
    pageThickness: 0.1,
    glueThickness: 0.1,
    manualUnitSize: 85,
    boardSize: 16
  }),
  filters: {
    fixed: function(value, size) {
      value = +value;
      return value.toFixed(size);
    }
  },
  mounted :function(){
     console.log(this.$store.state.order);
    console.log(this.$store.getters.double);
},
  methods: {
setEnv:function(){
        console.log(this.$store.state);
        this.$store.commit("setEnvelopesAmount");
        console.log(this.$store.state);
},
    floors: function(envelopesUnitAmount) {
      let fl =
        this.envelopesAmount / (this.boardSize * envelopesUnitAmount * 2);
      if (fl - Math.floor(fl) > 0.5) {
        return Math.ceil(fl);
      } else {
        return Math.floor(fl);
      }
    },
    sizeOnRange : function(from,until){
      let envelopesRange = from - until;
      let invoicesFrom = from * this.invoicesAmount / this.envelopesAmount;
      let invoicesUntil = until * this.invoicesAmount / this.envelopesAmount;
      let invoicesRange = envelopesRange * (this.invoicesAmount / this.envelopesAmount);
      let zruphotRange = envelopesRange * (this.zruphotAmount / this.envelopesAmount);       

     

      return { envelopesRange,
               zruphotRange,
              invoices : {
               invoicesRange,
               invoicesFrom,
               invoicesUntil
              }
            }

    }
  },
  computed: {
    sizeUnit: function() {
      let envelopesPrec = 3 / this.pagesToUnit;
      let invoicesPrec = 2 / this.pagesToUnit;
      let zruphotPrec = 1 / this.pagesToUnit;
      let gluePrec = 2 / this.pagesToUnit;

      return (
        envelopesPrec +
        gluePrec +
        (this.invoicesAmount / this.envelopesAmount) * invoicesPrec +
        (this.zruphotPages * this.zruphotAmount / this.envelopesAmount) * zruphotPrec
      );
    },
 unitAmount: function() {
      return Math.round(this.thickness / this.pageThickness);
    },
    // חצי חבילת המעטפות 
    envelopesUnitAmount: function() {
      return Math.round(this.unitAmount / this.sizeUnit);
    },
   
  }
};
</script>
