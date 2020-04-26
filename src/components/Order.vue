 <style scoped>
 .col {
   padding: 3px;
 }
 </style>>

<template>
  <v-container fluid>
    <v-form>
      <v-row>
        <v-col >
          <v-text-field v-model="envelopesAmount"  type="number" label="Envelopes" dense required hide-details></v-text-field>
        </v-col>

        <v-col >
          <v-text-field v-model="invoicesAmount" type="number" dense label="Invoices" required hide-details></v-text-field>
        </v-col>
        <v-col >
          <v-switch v-model="componentDisplay.zrophot" type="number" label="Zruphot" dense hide-details></v-switch>
        </v-col>
      </v-row>
      <v-row v-if="componentDisplay.zrophot">
        <v-col cols="4" >
          <v-text-field v-model="zruphotAmount"  type="number" dense label="Zruphot" required hide-details></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-text-field v-model="zruphotPages" type="number" dense label="Z-Pages" required hide-details></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col >
        <span class>Ratio I/E</span>
      </v-col>
      <v-col >
        <label class>{{ratioInvoiceEnvelope}}</label>
      </v-col>

      <v-spacer></v-spacer>

      <v-col>
        <span class>E Thick</span>
      </v-col>
      <v-col>
        <label class>{{envelopeThickness | fixed(2)}}</label>
      </v-col>
    </v-row>
  </v-container>
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
