<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-text-field type="number" label="Speed"  step="500" v-model="speedConveyor" dense></v-text-field>
          </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4"></v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="mt-5">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field type="number" label="From" v-model="fromEnvelope" dense hide-details></v-text-field>
          </v-col>
          <v-col>
            <v-text-field type="number" label="Until" v-model="untilEnvelope" dense hide-details></v-text-field>
          </v-col>
          <v-col>
            <v-text-field type="number" label="Total" v-model="totalEnvelope" dense hide-details></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <label>Duration Time:</label>
            <span>{{durationTime}}</span>
          </v-col>
          <v-col>
            <label>End Time :</label>
            <span>{{endWorkTime}}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="mt-5">
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-text-field type="time" label="Start Time" v-model="startTime" dense hide-details></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field type="time" label="End Time" v-model="endTime" dense hide-details></v-text-field>
          </v-col>
        
       
        </v-row>

        <v-row>
        
           <v-col >
            <span>Total Time : </span>
            <span>{{getTime.hour}}:{{getTime.minute}}</span>
          </v-col>
            <v-col>
            <label>Amount :</label>
            <span>{{envelopesPerTime}}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import "moment-duration-format";
import { mapState, mapGetters } from "vuex";
export default {
  name: "CalcTime",
  methods: {},
  computed: {
    ...mapGetters(["getTime", "envelopesPerTime", "totalEnvelope"]),
    ...mapState({
      workTime: "machine"
    }),
    speedConveyor: {
      get() {
        return this.$store.state.machine.speedConveyor;
      },
      set(value) {
        this.$store.commit("updateSpeedConveyor", value);
      }
    },
    startTime: {
      get() {
        return this.$store.state.machine.start;
      },
      set(value) {
        this.$store.commit("upateStartTime", value);
      }
    },
    fromEnvelope: {
      get() {
        return this.$store.state.machine.fromEnvelope;
      },
      set(value) {
        this.$store.commit("updateFromEnvelope", value);
      }
    },
    untilEnvelope: {
      get() {
        return this.$store.state.machine.untilEnvelope;
      },
      set(value) {
        this.$store.commit("updateUntilEnvelope", value);
      }
    },
    /*    totalEnvelope : {
  get(){
return 0
        },
        set(value){
          
        }
    }, */
    endTime: {
      get() {
        return this.$store.state.machine.end;
      },
      set(value) {
        this.$store.commit("updateEndTime", value);
      }
    },
    durationMinute: function() {
      const MINUTE = 60;
      return this.$store.getters.totalEnvelope / (this.speedConveyor / MINUTE);
    },
    durationTime: function() {
      return moment
        .duration(Math.round(this.durationMinute), "minutes")
        .format("hh:mm:ss");
    },
    endWorkTime: function() {
      return moment()
        .add(this.durationMinute, "minutes")
        .format("HH:mm:ss");
    },
    envelopePerMinute: function() {
      return (this.speedConveyor / 60).toFixed(1);
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col {
  padding: 4px;
}
</style>
