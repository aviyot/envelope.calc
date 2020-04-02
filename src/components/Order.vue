 <style>
.order {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
}
.main-order {
  display: block;
}
</style>
<template>
  <div class="main-order">
    <div class="order">
      <span>Envelopes</span>
      <input type="number" v-model="envelopesAmount">
      <span>Invoices</span>
      <input type="number" v-model="invoicesAmount">
      <span>Zruphot</span>
      <input type="number" v-model="zruphotAmount">
      <span>Z-Pages</span>
      <input type="number" v-model="zruphotPages">
    </div>
    <div class="row">
      <span class="col">
       <div class="row">
        <span class="col">Ratio I/E</span>
        <label class="col">{{ratioInvoiceEnvelope}}</label>
        </div>
      </span>
      <span class="col">
        <div class="row">
        <span class="col">Thick</span>
        <label class="col">{{envelopeThickness | fixed(2)}} </label>
        </div>
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Order",
   filters: {
    fixed: function(value, size) {
      value = +value;
      return value.toFixed(size);
    }
  },
  computed: {
    ...mapGetters(["ratioInvoiceEnvelope", "envelopeThickness"]),
    envelopesAmount: {
      get() {
        return this.$store.state.order.envelopesAmount;
      },
      set(value) {
        this.$store.commit("updateEnvelopesAmount", value);
      }
    },
    invoicesAmount: {
      get() {
        return this.$store.state.order.invoicesAmount;
      },
      set(value) {
        this.$store.commit("updateInvoicesAmount", value);
      }
    },
    zruphotAmount: {
      get() {
        return this.$store.state.order.zruphotAmount;
      },
      set(value) {
        this.$store.commit("updateZruphotAmount", value);
      }
    },
    zruphotPages: {
      get() {
        return this.$store.state.order.zruphotPages;
      },
      set(value) {
        this.$store.commit("updateZruphotPages", value);
      }
    }
  }
};
</script>
