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
      <div>
        <h4>Cumputed</h4>
        <span>Half Size : {{envelopesUnitAmount}}</span>
        <span>One floor : {{boardSize * envelopesUnitAmount* 2}}</span>
        <span>Floors : {{(envelopesAmount/(boardSize * envelopesUnitAmount*2)) | fixed(1)}}</span>
        <!-- <span>{{floors(envelopesUnitAmount)}}</span> -->
        <span>For {{floors(envelopesUnitAmount)}} floors :{{Math.ceil(envelopesAmount/(floors(envelopesUnitAmount)*boardSize*2))}}</span>
        <span>Max : {{floors(envelopesUnitAmount)*boardSize*2*Math.ceil(envelopesAmount/(floors(envelopesUnitAmount)*boardSize*2))}} </span>
      </div>
      <div>
        <h4>Manual</h4>
        <label>half Size :</label>
        <input type="number" v-model="manualUnitSize">
        <span>1 floor : {{boardSize * manualUnitSize*2}}</span>
        <span>Floors : {{(envelopesAmount/(boardSize * manualUnitSize*2))| fixed(1)}}</span>
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
  methods: {
    floors: function(envelopesUnitAmount) {
      let fl =
        this.envelopesAmount / (this.boardSize * envelopesUnitAmount * 2);
      if (fl - Math.floor(fl) > 0.5) {
        return Math.ceil(fl);
      } else {
        return Math.floor(fl);
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
    },
    floorss: function() {
      return (
        this.envelopesAmount / (this.boardSize * this.envelopesUnitAmount * 2)
      );
    },
    roundFloor: function() {
      let roundFloor = 1;
      return roundFloor;
    }
  }
};
</script>
