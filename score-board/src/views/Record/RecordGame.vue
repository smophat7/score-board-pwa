<template>
  <v-dialog fullscreen v-model="showDialog" @input="cancel">
    <v-app-bar id="top" app clipped-left dense color="primary" dark>
      <v-toolbar-title>Record New Gameplay</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="error" @click="cancel">
        <v-icon>mdi-close</v-icon>
        Cancel
      </v-btn>
    </v-app-bar>

    <v-card>

      <!-- Step overview at the top -->
      <v-stepper v-model="e1">
        <v-stepper-header class="fixed-stepper-header">
          <v-stepper-step :complete="e1 > 1" step="1">
            Game Played
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Players
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3">
            Game Type
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 4" step="4">
            Winner
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="5">
            Details
          </v-stepper-step>
        </v-stepper-header>

        <!-- Individual step content cards -->
        <v-stepper-items id="stepper-content" class="relative-stepper-content">
          <v-stepper-content step="1" class="stepper-contents">
            <v-card color="grey lighten-1" height="400px"></v-card>
            <br>
            <br>
            <v-card color="grey lighten-1" height="400px"></v-card>
          </v-stepper-content>

          <v-stepper-content step="2" class="stepper-contents">
            <v-card color="grey lighten-1" height="400px"></v-card>
          </v-stepper-content>

          <v-stepper-content step="3" class="stepper-contents">
            <v-card color="grey lighten-1" height="400px"></v-card>
          </v-stepper-content>

          <v-stepper-content step="4" class="stepper-contents">
            <v-card color="grey lighten-1" height="400px"></v-card>
          </v-stepper-content>

          <v-stepper-content step="5" class="stepper-contents">
            <v-card color="grey lighten-1" height="400px"></v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>

    <div class="fixed-bottom">
      <v-row justify="space-between" no-gutters class="px-3 py-3">
        <v-btn color="primary" @click="back()">
          Back
        </v-btn>
        <v-btn color="primary" @click="next()">
          Next
        </v-btn>
      </v-row>
    </div>

  </v-dialog>
</template>

<script>
  export default {
    name: "RecordGame",
    data () {
      return {
        e1: 1,
        showDialog: true,
      }
    },
    methods: {
      cancel() {
        this.showDialog = !this.showDialog;
        // Go back to previous page
        this.$router.go(-1);
      },
      back() {
        if (this.e1 !== 1) {
          this.e1--;
        }
        // this.scrollToTop();
      },
      next() {
        if (this.e1 !== 5) {
          this.e1++;
        }
        // this.scrollToTop();
      },
      // scrollToTop() {
      //   console.log("scrollToTop()");
      //   // $vuetify.goTo('#top', {duration: 500, offset: 0});
      //   document.getElementById("stepper-content").scroll(0, 0);
      // }
    }
  }
</script>

<style scoped>

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
}

.fixed-bottom {
  position: fixed;
  bottom: 0;
  background-color: white;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}

</style>