<template>
  <v-dialog fullscreen v-model="showDialog" @input="cancel">
    <v-app-bar id="top" class="fixed" clipped-left dense color="primary" dark>
      <v-toolbar-title>Record Game Play</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="error" @click="cancel" small>
        <v-icon>mdi-close</v-icon>
        Cancel
      </v-btn>
    </v-app-bar>

    <v-card>

      <!-- Step overview at the top -->
      <v-stepper v-model="recordStep">
        <v-stepper-header class="fixed-stepper-header">
          <v-stepper-step :complete="recordStep > 1" step="1">
            Game Played
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="recordStep > 2" step="2">
            Players
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="recordStep > 3" step="3">
            Game Type
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="recordStep > 4" step="4">
            Winner
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="5">
            Details
          </v-stepper-step>
        </v-stepper-header>

        <!-- Individual step content cards -->
        <v-stepper-items id="stepper-content" class="relative-stepper-content">
          <v-stepper-content step="1" class="stepper-contents ">
            <SelectGame />
          </v-stepper-content>

          <v-stepper-content step="2" class="stepper-contents ">
            <SelectPlayers />
          </v-stepper-content>

          <v-stepper-content step="3" class="stepper-contents ">
            <SelectGameType />
          </v-stepper-content>

          <v-stepper-content step="4" class="stepper-contents ">
            <DetermineStandings />
          </v-stepper-content>

          <v-stepper-content step="5" class="stepper-contents ">
            <RecordDetails />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>

    <div class="fixed-bottom">
      <v-row justify="space-between" no-gutters class="px-3 py-3">
        <v-btn v-if="recordStep != 1" color="primary" @click="back()">
          Back
        </v-btn>
        <v-spacer v-else></v-spacer>
        <v-btn v-if="recordStep !=5" color="primary" :disabled="!ifCanAdvance" @click="next()">
          Next
        </v-btn>
        <v-btn v-else color="success" @click="submit()">
          <v-progress-circular small v-if="loadingSubmit" class="mr-2"
            indeterminate
            color="white"
            ></v-progress-circular>
          Save Play
        </v-btn>
      </v-row>
    </div>

  </v-dialog>
</template>

<script>
import { parseISO, parse, toDate } from "date-fns";
import axios from "axios";

  export default {
    name: "RecordGame",
    components: {
      SelectGame: () => import ("@/components/Plays/Record/SelectGame.vue"),
      SelectPlayers: () => import ("@/components/Plays/Record/SelectPlayers.vue"),
      SelectGameType: () => import ("@/components/Plays/Record/SelectGameType.vue"),
      DetermineStandings: () => import ("@/components/Plays/Record/DetermineStandings.vue"),
      RecordDetails: () => import ("@/components/Plays/Record/RecordDetails.vue"),
    },
    data () {
      return {
        loadingSubmit: false,
        showDialog: true,
      }
    },
    computed: {
      recordStep: {
        set(recordStep) {
          this.$store.commit("record/updateRecordStep", recordStep);
        },
        get() {
          return this.$store.state.record.recordStep;
        },
      },
      ifCanAdvance() {
        return this.$store.getters["record/ifCanAdvance"];
      },
    },
    methods: {
      cancel() {
        this.$store.commit("record/clearRecordState");
        this.showDialog = !this.showDialog;
        
        // Go back to previous page
        this.$router.go(-1);
      },
      back() {
        if (this.recordStep !== 1) {
          this.recordStep = this.recordStep - 1;
        }
      },
      next() {
        if (this.recordStep !== 5) {
          this.recordStep = this.recordStep + 1;
        }
      },
      async submit() {
        this.$store.dispatch("record/add");

        // Navigate back to play history page
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
.fixed {
  position: fixed;
  z-index: 10;
}

.fixed-stepper-header {
  position: fixed;
  top: 48px;
  width: 100%;
  z-index: 1;
  background-color: white;
}

.relative-stepper-content {
  position: relative;
  top: calc(48px + 72px);
  z-index: 0;
}

.stepper-contents {
  padding-bottom: 200px;
  min-height:100vh;
}

.fixed-bottom {
  position: fixed;
  bottom: 0;
  background-color: white;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}

</style>