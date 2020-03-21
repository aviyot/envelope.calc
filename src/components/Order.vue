 <style>
.order  {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
}
</style>
<template>
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
</template>
<script>
export default {
  name: "Order",
  computed: {
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
