<style scoped>

</style>
<template>
  <div >
    <v-row>
      <v-col>
        <v-text-field v-model="orderFrom" type="number" label="From" dense required hide-details></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="orderUntil" type="number" label="Until" dense required hide-details></v-text-field>
      </v-col>
       <v-col>
        <v-text-field readonly :value="orderUntil - (orderFrom- 1)" type="number" label="Total" dense required hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-row>
         <v-col>
             Invoices Range
          </v-col>
      <v-col>
       {{(orderFrom * ratioInvoiceEnvelope).toFixed() }} - {{(orderUntil * ratioInvoiceEnvelope).toFixed()}}
        </v-col>
       
        </v-row>
  </div>
</template>
<script>
import {mapGetters } from 'vuex';
export default {
  name: "Packaging",
  computed: {
    ...mapGetters([
      'ratioInvoiceEnvelope'
      ]),
    envelopePackageAmount() {
      return this.$store.getters.envelopePackageAmount;
    },
    orderFrom: {
      get() {
        return this.$store.state.board.orderFrom;
      },
      set(value) {
        this.$store.commit("updateOrderFrom", value);
      }
    },
    orderUntil: {
      get() {
        return this.$store.state.board.orderUntil;
      },
      set(value) {
        this.$store.commit("updateOrderUntil", value);
      }
    }
  }
};
</script>