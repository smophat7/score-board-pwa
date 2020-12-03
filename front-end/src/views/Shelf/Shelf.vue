<template>
  <v-container>
    <v-container>
      <v-row>
        <h1>Collection</h1>
        <v-spacer></v-spacer>

        <!-- Desktop Action Button (stays at the top) -->
          <v-btn class="hidden-xs-only my-auto" color="secondary" rounded @click="searchNewButtonClick">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Add Game
          </v-btn>

        <!-- Mobile FAB (position:fixed) -->
        <v-fab-transition>
          <v-btn class="d-sm-none fab-mobile" color="secondary" fab fixed @click="searchNewButtonClick">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>

      </v-row>
    </v-container>

    <v-dialog
      v-model="searchNewGamesDialog"
      max-width="550px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <SearchNewGame v-on:close-modal="searchNewGamesDialog = false"/>
    </v-dialog>

    <!-- Table and Search -->
    <v-card-title>
      <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" clearable label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <!-- mobile-breakpoint="" eliminates the mobile table view option as I'm doing custom column visibility instead -->
    <v-data-table
      class="margin-bottom-for-fab"
      :headers="computedHeaders"
      :items="games"
      :search="search"
      mobile-breakpoint=""
      @click:row="handleDetailClick"
    >
    </v-data-table>

    <!-- Dialog/Modal with additional information -->
    <v-dialog
      v-model="detailDialog"
      max-width="550px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <GameDetails :game="detailGame" v-on:close-modal="detailDialog = false"/>
    </v-dialog>

  </v-container>
</template>

<script>
import GameDetails from "@/components/GameDetails.vue";
import SearchNewGame from "@/components/SearchNewGame.vue";
// import HistoryFunctions from "@/mixins/HistoryFunctions.js";

import axios from "axios";

export default {
  name: "Shelf",
  components: {
    GameDetails,
    SearchNewGame,
  },
  // mixins: [HistoryFunctions],
  data() {
    return {
      // gameList: [],
      games: [],
      search: "",
      detailDialog: false,
      searchNewGamesDialog: false,
      detailGame: null,
      headers: [
        { text: "Game", value: 'name'},
        { text: "Min. Players", value: 'min_players' },
        { text: "Max. Players", value: 'max_players', hide: 'xsOnly' },
        { text: "Min. Time (minutes)", value: 'min_playtime' },
        { text: "Max. Time (minutes)", value: 'max_playtime', hide: 'xsOnly' },
        { text: "Release", value: 'year_published', hide: 'smAndDown'},
      ]
    };
  },
  created() {
    this.getCollection();
  },
  computed: {
    computedHeaders() {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide]);
    },
    // games() {
    //   // return this.$root.$data.shelf.map(game => {
    //   return this.gameList.map(game => {
    //     return {
    //       ...game,
    //     }
    //   });
    // },
  },
  methods: {
    async getCollection() {
      let url = "http://localhost:3000/collection";
      // let url = "/collection";
      // const response = await fetch(url);
      // this.gameList = response.json();

      let response = await axios.get(url);
      console.log(response.data);
      let gameList = response.data;
      this.games = gameList.map(game => {
        return {
          ...game,
        }
      });
    },
    handleDetailClick(item) {
      this.detailGame = item;
      this.detailDialog = true;
    },
    searchNewButtonClick() {
      this.searchNewGamesDialog = true;
    },
  }
};
</script>

<style scoped>
@media (max-width: 600px){
  .mobile-invisible-column {
    display: none !important;
  }
}
</style>