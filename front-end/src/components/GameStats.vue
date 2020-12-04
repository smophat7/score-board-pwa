<template>
  <v-card class="d-flex flex-column">

    <v-card-title class="secondary headline">
      <div class="text-truncate white--text">
        Details
      </div>
      <v-spacer></v-spacer>
      <v-btn color="error" class="mr-5" @click="deleteGame">
        <v-progress-circular v-if="deleteLoading"
            indeterminate
            color="white"
          ></v-progress-circular>
        <v-icon v-else color="white">mdi-delete-forever</v-icon>
      </v-btn>
      <v-btn color="primary" @click="$store.commit('setIfGameEditComponent', true)">
        <v-icon color="white">mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" class="py-2 text-center">
          <v-img class="img-size mx-auto" :src="game.images.medium" :alt="game.name + ' game cover'"></v-img>
          <h1 class="mt-3">{{ game.name }}</h1>
        </v-col>
        <v-col cols="12" sm="6" class="py-4">
          <h3>Details</h3>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Minimum age: <strong>{{game.min_age}}</strong></v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-title>Min. Players: <strong>{{game.min_players}}</strong></v-list-item-title>
                <v-list-item-title>Max. Players: <strong>{{game.max_players}}</strong></v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-title>Min. Time: <strong>{{game.min_playtime}}</strong></v-list-item-title>
                <v-list-item-title>Max. Time: <strong>{{game.max_playtime}}</strong></v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-title>Published: <strong>{{game.year_published}}</strong></v-list-item-title>
                <v-list-item-title>Publisher: <strong>{{game.primary_publisher}}</strong></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      
      <v-row justify="space-around" class="pb-4">
        <v-btn width="125px" :href="game.official_url" target="_blank" color="primary">Offical Site</v-btn>
        <v-btn width="100px" :href="game.rules_url" target="_blank" color="primary">Rule Book</v-btn>
      </v-row>

      <p><strong>Description:</strong> {{ game.description_preview }}</p>
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

import HistoryFunctions from "@/mixins/HistoryFunctions.js";

export default {
  name: "GameStats",
  props: {
    game: Object,
  },
  mixins: [HistoryFunctions],
  data() {
    return {
      deleteLoading: false,
    }
  },
  methods: {
    async deleteGame() {
      this.deleteLoading = true;
      let url = "http://localhost:3000/collection/" + this.game._id;
      try {
        await axios.delete(url);
      }
      catch (error) {
        console.log(error);
      }
      this.deleteLoading = false;
      this.$store.commit('setIfCollectionChanged', true);
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.full-screen-modal {
  height: 100%;
}

@media (max-width: 600px) {
  .img-size {
    max-width: 200px;
  }
}
</style>