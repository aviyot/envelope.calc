 <style scoped>
 .col {
   padding: 3px;
 }
 </style>>

<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col >
          <v-text-field v-model="envelopesAmount"  type="number" label="Envelopes" dense required hide-details></v-text-field>
        </v-col>

        <v-col >
          <v-text-field v-model="invoicesAmount" type="number" dense label="Invoices" required hide-details></v-text-field>
        </v-col>
        <v-col >
          <v-switch @change="resetZruphot" v-model="componentDisplay.zrophot" type="number" label="Zruphot" dense hide-details></v-switch>
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
        <span >Ratio I/E</span> : <label >{{ratioInvoiceEnvelope}}</label>
      </v-col>
 
      <v-col>
        <span >E Thick</span> : <label>{{envelopeThickness | fixed(2)}} </label>
      </v-col>
      <v-col>
        <ThicknessSettings/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ThicknessSettings from "./ThicknessSettings"
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "Order",
  components :{
    ThicknessSettings,
  },
  filters: {
    fixed: function(value, size) {
      value = +value;
      return value.toFixed(size);
    }
  },
    methods: {
      ...mapMutations(["resetZruphot"])

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
