 <style>

</style>
<template>
  <div class="">
    <v-form>
      <v-row>
        <v-col cols="4" md="4">
          <v-text-field v-model="envelopesAmount" label="Envelopes" dense required hide-details></v-text-field>
        </v-col>

        <v-col cols="4" md="4">
          <v-text-field v-model="invoicesAmount" dense label="Invoices" required hide-details></v-text-field>
        </v-col>
        <v-col cols="4" md="4">
          <v-switch v-model="componentDisplay.zrophot" label="Zruphot" dense hide-details></v-switch>
        </v-col>
      </v-row>
      <v-row v-if="componentDisplay.zrophot">
        <v-col cols="4" md="4">
          <v-text-field v-model="zruphotAmount" dense label="Zruphot" required hide-details></v-text-field>
        </v-col>

        <v-col cols="4" md="4">
          <v-text-field v-model="zruphotPages" dense label="Z-Pages" required hide-details></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="3">
        <span class>Ratio I/E</span>
      </v-col>
      <v-col cols="2">
        <label class>{{ratioInvoiceEnvelope}}</label>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="3">
        <span class>E Thick</span>
      </v-col>
      <v-col cols="2">
        <label class>{{envelopeThickness | fixed(2)}}</label>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
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
    ...mapState(["componentDisplay"]),
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
