<template>
  <v-card class="d-flex flex-column full-screen-modal">
    
    <v-card-title class="secondary headline">
      <div class="d-flex clickable-pointer" @click="backToStats">
        <v-icon color="white">mdi-arrow-left</v-icon>
        <div class="ml-2 white--text">
          Back to Details
        </div>
      </div>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-form v-on:submit.prevent="updateGame">
          <v-text-field label="Preferred Title" v-model="prefName" autofocus required></v-text-field>
          <v-btn v-if="loadingUpdate" color="success" block>
            <v-progress-circular small v-if="loadingUpdate" class="mr-2"
            indeterminate
            color="white"
            ></v-progress-circular>
            Saving Changes
          </v-btn>
          <v-btn v-else color="success" type="submit" block :disabled="!somethingDifferent">Save Changes</v-btn>
        </v-form>
      </v-container>
    </v-card-text>

    <v-spacer></v-spacer>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn block color="error" text @click="$emit('close-modal')">
        <v-icon left color="error">mdi-close-circle</v-icon>
        Close
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "GameEdit",
  data() {
    return {
      gameLocal: null,
      prefName: "",
    };
  },
  created() {
    this.gameLocal = this.game,
    this.prefName = this.game.name;
  },
  computed: {
    game() { return this.$store.state.collection.detailGame; },
    loadingUpdate() { return this.$store.state.collection.loadingUpdate },
    somethingDifferent() {
      return (this.prefName !== this.gameLocal.name);
    },
  },
  methods: {
    async updateGame() {
      let newGameVersion = new Object({
        name: this.prefName,
      });
      await this.$store.dispatch("collection/update", {
        currentGameId: this.game._id,
        updatedGame: newGameVersion,
      });
      this.gameLocal = this.game;
    },
    backToStats() {
      this.$store.commit('setIfGameEditComponent', false);
    },
  },
}
</script>

<style scoped>

.clickable-pointer {
  cursor: pointer;
}
</style>