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
            <h2>Welcome</h2>
            <h3>Something about the value of ScoreBoard and what it will do for you.</h3>
          </v-stepper-content>

          <v-stepper-content step="2" class="stepper-contents ">
            <h2>Groups</h2>
            <h3>Get individualized stats for each member of your gaming group.</h3>
          </v-stepper-content>

          <v-stepper-content step="3" class="stepper-contents ">
            <h2>Collection</h2>
            <h3>Your digital gaming closet. Search from over _______ games or create your own.</h3>
          </v-stepper-content>

          <v-stepper-content step="4" class="stepper-contents ">
            <h2>Record Plays</h2>
            <h3>Track each instance of gameplay with with co-op, ranked, and scored game types.</h3>
          </v-stepper-content>

          <v-stepper-content step="5" class="stepper-contents ">
            <h2>Get Started</h2>
            <h3>Create your first gaming group. All you need is a name (that you can change at any time).</h3>
            <v-text-field v-model="groupName" label="Group Name" required></v-text-field>
            <p>Other ScoreBoard users can join your group by entering the unique join code that you can find on the Group page.</p>
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
        <v-btn v-else color="success" :disabled="groupName == null || groupName == ''" @click="submit()">
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
      groupName: "",
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
      async submit() {
        this.loadingSubmit = true;
        let newGroup = {
          name: this.groupName,
          date: new Date(),
          members: [this.$store.state.user.member._id],
          games: [],
          joinCode: Math.random().toString(36).substr(2, 8).toUpperCase(),            // Randomly generated all-caps alphanumeric string, 8-chars
        }
        await this.$store.dispatch("groups/add", newGroup);
        await this.$store.dispatch("groups/fetch");
        this.loadingSubmit = false;
        await this.finishOnboarding();
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