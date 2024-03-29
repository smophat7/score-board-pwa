<template>
  <v-card class="d-flex flex-column">
    
    <v-card-title class="secondary headline">
      <div class="white--text">
        Search New Games
      </div>
    </v-card-title>

    <v-card-text>
      <div class="px-3">
        <v-form v-on:submit.prevent="searchGames" class="game-search-form mb-5" id="gameSearchForm">
          <v-row align="center" justify-center>
            <v-col cols="8">
              <v-text-field v-model="searchValue" autofocus label="Search from 120,000+ games"
                required clearable></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn color="primary" type="submit" block>
                <v-progress-circular v-if="loading" class="mr-3"
                  indeterminate
                  color="white"
                ></v-progress-circular>
                <div v-if="!loading">
                  Search
                </div>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>

      <div v-if="!loading">
        <div v-if="searched">
          <div v-if="noResults">
            <p>Your search yielded no results! Please check your spelling.</p>
          </div>

          <v-list class="mx-0">
            <v-card v-for="game in searchResults" :key="game.id" class="my-2">
              <v-list-item>
                <v-list-item-icon class="my-auto">
                  <v-img :src="game.images.small" :alt="game.name + ' game cover'" width="100px"></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="mb-3">{{ game.name }}</v-list-item-title>
                  <v-row no-gutters justify-space-between>
                    <v-col cols="12" sm="6">
                      <v-list-item-subtitle>Min. age: <strong>{{ game.min_age }}</strong></v-list-item-subtitle>
                      <v-list-item-subtitle>Min. Players: <strong>{{ game.min_players }}</strong></v-list-item-subtitle>
                      <v-list-item-subtitle>Max. Players: <strong>{{ game.max_players }}</strong></v-list-item-subtitle>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-list-item-subtitle>Min. Time: <strong>{{ game.min_playtime }}</strong></v-list-item-subtitle>
                      <v-list-item-subtitle>Max. Time: <strong>{{ game.max_playtime }}</strong></v-list-item-subtitle>
                      <v-list-item-subtitle>Published: <strong>{{ game.year_published }}</strong></v-list-item-subtitle>
                    </v-col>
                  </v-row>
                  <div class="mt-3">
                    <v-btn v-if="gameOnShelf(game)" color="error" @click="removeFromShelf(game)" block>Remove</v-btn>
                    <v-btn v-else color="success" @click="addToShelf(game)" block>Add</v-btn>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-list>

        </div>
      </div>
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
import HistoryFunctions from "@/mixins/HistoryFunctions.js";
import axios from "axios";

export default {
  name: "SearchNewGame",
  mixins: [HistoryFunctions],
  data() {
    return {
      searchValue: "",
      oldSearchValue: "",
      searchResults: [],
      deleteLoading: false,
      loading: false,
      searched: false,
    };
  },
  computed: {
    collection() { return this.$store.state.collection.games; },
    loadingAddNew() { return this.$store.state.collection.loadingAddNew; },
    loadingDelete() { return this.$store.state.collection.loadingDelete; },
    sameSearchTerm() {
      if (this.oldSearchValue !== "") {
        return this.searchValue === this.oldSearchValue;
      } else {
        return false;
      }
    },
    noResults() {
      if (this.searched) {
        return this.searchResults.length === 0;
      } else {
        return false;
      }
    },
  },
  methods: {
    searchGames() {
      if (this.searchValue === "" || this.sameSearchTerm) {
        return;
      }
      this.searchResults = [];
      // My client_id: "xPJ2LwITlm"
      let url =
        "https://api.boardgameatlas.com/api/search?name=" +
        this.searchValue +
        "&fuzzy_match=true&order_by=popularity&limit=21&client_id=xPJ2LwITlm";
      this.loading = true;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          this.searchResults.push(...json.games);
          this.loading = false;
          this.searched = true;
          this.oldSearchValue = this.searchValue;
        });
    },
    async addToShelf(game) {
      await this.$store.dispatch("collection/addToCurrentGroup", game);
      // await this.$store.dispatch("collection/add", game);
    },
    async removeFromShelf(game) {
      // Because this list is based off of the BoardGame Atlas API results which have
      // different id values
      let mongoDoc = this.collection.find(item => {
        return item.board_game_id === game.id;
      });
      await this.$store.dispatch("collection/cascadeDelete", mongoDoc);
    },
    gameOnShelf(game) {
      return this.collection.some((item) => item.board_game_id === game.id);
    },
  },
};
</script>