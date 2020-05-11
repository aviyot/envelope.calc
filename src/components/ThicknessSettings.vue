<template>
  <div class="text-center">
    <v-dialog
      v-model="componentDisplay.dialog"
    >
      <template v-slot:activator="{ on }">
       
            <v-icon v-on="on"> mdi-cog</v-icon>
  
      </template>

      <v-card>
        <v-card-title
          primary-title
        >
        Thickness 
        </v-card-title>

        <v-card-text>
             <v-container>
                 <v-form>
                      <v-text-field v-model = "envelopeThickness" label="Envelope" type="number"> </v-text-field>
                      <v-text-field v-model = "invoiceThickness" label="Invoices" type="number"> </v-text-field>
                      <v-text-field v-model = "zruphotThickness" label="Zruphot" type="number"> </v-text-field>
                      <v-text-field v-model.number = "glueThickness" label="Glue" type="number"> </v-text-field>

                       <span> Thickness : {{oneEnvelopeThickness}} </span>
                     </v-form>
             </v-container>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="componentDisplay.dialog= false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="componentDisplay.dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {  mapState,mapGetters } from "vuex";

  export default {

     
     computed : {
    ...mapGetters({oneEnvelopeThickness:"envelopeThickness"}),
    ...mapState(['thicknessParameter','componentDisplay']),
    envelopeThickness : {
        get () {
            return this.$store.state.thicknessParameter.envelopeThickness;
        },
        set(value) {
           this.$store.commit("updtaEnvelopeThickness",value)
        }
    },
    invoiceThickness : {
        get () {
            return this.$store.state.thicknessParameter.invoiceThickness;
        },
        set(value) {
           this.$store.commit("updateInvoiceThickness",value)
        }
    },
    zruphotThickness : {
        get() {
            return this.$store.state.thicknessParameter.zruphotThickness
        },
        set(value){
            this.$store.commit("updateZruphotThickness",value)
        }
    },
      glueThickness : {
          get() {
              return this.$store.state.thicknessParameter.glueThickness;
          },
          set(value){
              this.$store.commit("updateGlueThickness" , value)
          }
      }
      }
  }
</script>