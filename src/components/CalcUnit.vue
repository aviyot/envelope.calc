<template>
  <div>
    <!-- <h1>Unit Calc</h1> -->
    <div class="input-section">
      <span>Envelopes Amount</span>
      <input type="number" v-model="envelopesAmount">
      <span>Invoices Amount</span>
      <input type="number" v-model="invoicesAmount">
      <span>Zruphot Amount</span>
      <input type="number" v-model="zruphotAmount">
      <span>Zruphot Pages</span>
      <input type="number" v-model="zruphotPages">
      <span>Thickness(cm)</span>
      <input type="number" v-model="thickness">
    </div>
    <div>
      <span>Thickness : {{sizeUnit}}%</span>
    </div>
    <div>
      <span>Half Unit Size :{{envelopesUnitAmount}}</span>
      <br>
      <span>Unit Size :{{envelopesUnitAmount * 2}}</span>
    </div>

    <div>
      <h3>Broad Calc</h3>
      <div class="two-column-grid">
        <label>Half Unit Size:</label>
        <input type="number" v-model="manualUnitSize">
        
        <label>Size Board</label>
        <input type="number" v-model="boardSize">
      </div>
      <!-- <span>Calc: number of evelopes on 1 floor : {{boardSize * envelopesUnitAmount*2}}</span><br> -->
      <span>Manual: number of evelopes on 1 floor : {{boardSize * manualUnitSize*2}}</span>
      <div>
        <span>Number of floors {{envelopesAmount/(boardSize * manualUnitSize*2)}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CalcUnit",
  data: () => ({
    envelopesAmount: 1,
    invoicesAmount: 1,
    zruphotAmount: 1,
    zruphotPages: 0,
    pagesToUnit: 5,
    thickness: 12,
    pageThickness: 0.134,
    manualUnitSize: 90,
    boardSize: 16
  }),
  computed: {
    sizeUnit: function() {
      let envelopesPrec = 3 / this.pagesToUnit;
      let invoicesPrec = 2 / this.pagesToUnit;
      let zruphotPrec = 1 / this.pagesToUnit;

      return (
        envelopesPrec +
        (this.invoicesAmount / this.envelopesAmount) * invoicesPrec +
        this.zruphotPages *
          zruphotPrec *
          (this.zruphotAmount / this.envelopesAmount)
      );
    },
    envelopesUnitAmount: function() {
      return Math.round(this.unitAmount / this.sizeUnit);
    },
    unitAmount: function() {
      return Math.round(this.thickness / this.pageThickness);
    }
  }
};
</script>
<style>
.input-section {
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 80%;
  margin: 0 auto;
}
</style>