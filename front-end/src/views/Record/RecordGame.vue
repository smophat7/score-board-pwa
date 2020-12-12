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
      <v-stepper v-model="activeStep">
        <v-stepper-header class="fixed-stepper-header">
          <v-stepper-step :complete="activeStep > 1" step="1">
            Game Played
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="activeStep > 2" step="2">
            Players
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="activeStep > 3" step="3">
            Game Type
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="activeStep > 4" step="4">
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
        <v-btn v-if="activeStep != 1" color="primary" @click="back()">
          Back
        </v-btn>
        <v-spacer v-else></v-spacer>
        <v-btn v-if="activeStep !=5" color="primary" :disabled="!ifCanAdvance" @click="next()">
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
      SelectGame: () => import ("@/components/Record/SelectGame.vue"),
      SelectPlayers: () => import ("@/components/Record/SelectPlayers.vue"),
      SelectGameType: () => import ("@/components/Record/SelectGameType.vue"),
      DetermineStandings: () => import ("@/components/Record/DetermineStandings.vue"),
      RecordDetails: () => import ("@/components/Record/RecordDetails.vue"),
    },
    data () {
      return {
        activeStep: 1,
        loadingSubmit: false,
        showDialog: true,
      }
    },
    computed: {
      ifCanAdvance() {
        return this.$store.state.recordStep > this.activeStep;
      },
    },
    methods: {
      cancel() {
        this.$store.commit("clearRecordState");
        this.showDialog = !this.showDialog;
        // Go back to previous page
        this.$router.go(-1);
      },
      back() {
        if (this.activeStep !== 1) {
          this.activeStep--;
        }
      },
      next() {
        if (this.activeStep !== 5) {
          this.activeStep++;
        }
      },
      async submit() {
        this.loadingSubmit = true;

        // Create array of member ids instead of member objects to include in newPlay for DB
        let gamePlayers = this.$store.state.recordPlayers.map(playerObj => {
          return playerObj.id;
        });

        // Create new play object to post to DB
        let newPlay = {
          players: gamePlayers,
          numPlayers: gamePlayers.length,
          game: this.$store.state.recordGame._id,         // maybe just the id, idk
          type: this.$store.state.recordGameType,
          points: this.$store.state.recordPoints,
          ranking: {},      // no idea yet
          coopWin: this.$store.state.recordCoopWin,
          description: this.$store.state.recordDescription,
          // date: parseISO(this.$store.state.datePlayed),
          date: parseISO(this.$store.state.recordDate, 'YYYY-MM-DD', new Date()),
        };

        // Post to MongoDB
        let url = "http://localhost:3000/plays";
        try {
          let response = await axios.post(url, newPlay);
        }
        catch(error) {
          console.log(error);
        }

        this.loadingSubmit = false,
        this.$store.commit("clearRecordState");

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