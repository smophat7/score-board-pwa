<template>
  <v-dialog fullscreen v-model="showDialog" @input="logOut">
    <v-app-bar id="top" class="fixed" clipped-left dense color="primary" dark>
      <v-toolbar-title>
        <v-img alt="ScoreBoard Logo" class="shrink mr-2" contain
          :src="'../img/logo/default_2.png'" transition="scale-transition" width="160" />
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="secondary" @click="logOut">
        <v-icon>mdi-logout</v-icon>
        Log Out
      </v-btn>
    </v-app-bar>

    <v-card>

      <!-- Step overview at the top -->
      <v-stepper v-model="onboardingStep">
        <v-stepper-header class="fixed-stepper-header">
          <v-stepper-step :complete="onboardingStep > 1" step="1">
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="onboardingStep > 2" step="2">
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="onboardingStep > 3" step="3">
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="onboardingStep > 4" step="4">
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="5">
          </v-stepper-step>
        </v-stepper-header>

        <!-- Individual step content cards -->
        <v-stepper-items id="stepper-content" class="relative-stepper-content">
          <v-stepper-content step="1" class="stepper-contents ">
            <h2>Step 1</h2>
          </v-stepper-content>

          <v-stepper-content step="2" class="stepper-contents ">
            <h2>Step 2</h2>
          </v-stepper-content>

          <v-stepper-content step="3" class="stepper-contents ">
            <h2>Step 3</h2>
          </v-stepper-content>

          <v-stepper-content step="4" class="stepper-contents ">
            <h2>Step 4</h2>
          </v-stepper-content>

          <v-stepper-content step="5" class="stepper-contents ">
            <h2>Step 5</h2>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>

    <div class="fixed-bottom">
      <v-row justify="space-between" no-gutters class="px-3 py-3">
        <v-btn v-if="onboardingStep != 1" color="primary" @click="back()">
          Back
        </v-btn>
        <v-spacer v-else></v-spacer>
        <v-btn v-if="onboardingStep !=5" color="primary" @click="next()">
          Next
        </v-btn>
        <v-btn v-else color="success" @click="submit()">
          <v-progress-circular small v-if="loadingSubmit" class="mr-2"
            indeterminate
            color="white"
            ></v-progress-circular>
          Begin
        </v-btn>
      </v-row>
    </div>

  </v-dialog>
</template>

<script>
import firebase from "firebase";


export default {
  name: "Onboarding",
  data () {
    return {
      loadingSubmit: false,
      showDialog: true,
      onboardingStep: 1,
    }
  },
    methods: {
      async logOut() {
        // this.showDialog = !this.showDialog;
        await firebase.auth().signOut();
        this.$router.replace({ name: "Login" });
      },
      back() {
        if (this.onboardingStep !== 1) {
          this.onboardingStep = this.onboardingStep - 1;
        }
      },
      next() {
        if (this.onboardingStep !== 5) {
          this.onboardingStep = this.onboardingStep + 1;
        }
      },
      async finishOnboarding() {
        await this.$store.dispatch("completeOnboarding");
        this.$router.replace({ name: "Collection" });
      },
    },
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