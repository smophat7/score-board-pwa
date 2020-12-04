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
          <v-text-field label="Preferred Title" v-model="prefName" required></v-text-field>
          <v-btn v-if="updateLoading" color="success" block>
            <v-progress-circular small v-if="updateLoading" class="mr-2"
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
  props: {
    game: Object,
  },
  data() {
    return {
      gameLocal: this.game,
      prefName: this.game.name,
      updateLoading: false,
    };
  },
  computed: {
    somethingDifferent() {
      return (this.prefName !== this.gameLocal.name);
    },
  },
  methods: {
    async updateGame() {
      this.updateLoading = true;
      let newGameVersion = new Object({
        name: this.prefName,
      });
      let url = "/api/collection/" + this.game._id;
      try {
        let response = await axios.put(url, newGameVersion);
        this.gameLocal = response.data;
      }
      catch (error) {
        console.log(error);
      }
      this.prefName = this.gameLocal.name,
      this.$store.commit('setIfCollectionChanged', true);
      this.updateLoading = false;
    },
    backToStats() {
      this.$store.commit('setIfGameEditComponent', false);
    },
  },
}
</script>

<style scoped>
.full-screen-modal {
  height: 100%;
}

.clickable-pointer {
  cursor: pointer;
}
</style>