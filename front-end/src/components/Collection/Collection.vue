<template>
  <v-container>
    <v-container>
      <v-row>
        <h1>Collection</h1>
        <v-spacer></v-spacer>

        <!-- Desktop Action Button (stays at the top) -->
          <v-btn class="hidden-xs-only my-auto" color="secondary" rounded @click="searchNewButtonClick">
            <font-awesome-layers class="mr-2">
              <font-awesome-icon icon="chess-rook" class="fa-lg" transform="right-1"/>
              <font-awesome-icon icon="plus" class="fa-xs" transform="left-15 down-3 shrink-3" />
            </font-awesome-layers>
            Add Game
          </v-btn>

        <!-- Mobile FAB (position:fixed) -->
        <v-fab-transition>
          <v-btn class="d-sm-none fab-mobile" color="secondary" fab fixed @click="searchNewButtonClick">
            <font-awesome-layers>
              <font-awesome-icon icon="chess-rook" class="fa-lg" transform="right-1"/>
              <font-awesome-icon icon="plus" class="fa-xs" transform="left-15 down-3 shrink-3" />
            </font-awesome-layers>
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
      <SearchNewGame @close-modal="searchNewGamesDialog = false"/>
    </v-dialog>

    <!-- Table and Search -->
    <div v-if="loadingGames" class="d-flex loader-container">
      <RingLoader class="my-auto mx-auto" :loading="loadingGames" color="#3949ab" :size=200 />
    </div>
    <div v-if="!loadingGames">
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
        no-data-text="You have no games in your collection... yet!"
        no-results-text="Nothing found... try searching someting else?"
        @click:row="handleDetailClick"
      >
      </v-data-table>
    </div>

    <!-- Dialog/Modal with additional information -->
    <v-dialog
      v-model="detailDialog"
      max-width="550px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <GameDetails v-on:close-modal="detailDialog = false"/>
    </v-dialog>

  </v-container>
</template>

<script>
import { RingLoader } from "@saeris/vue-spinners";

export default {
  name: "Collection",
  components: {
    GameDetails: () => import("@/components/Collection/GameDetails.vue"),
    SearchNewGame: () => import("@/components/Collection/SearchNewGame.vue"),
    RingLoader,
  },
  data() {
    return {
      search: "",
      detailDialog: false,
      searchNewGamesDialog: false,
      headers: [
        { text: "Game", value: 'name'},
        { text: "# Plays", value: 'numPlays'},
        { text: "Min. Players", value: 'min_players' },
        { text: "Max. Players", value: 'max_players', hide: 'xsOnly' },
        { text: "Min. Time (minutes)", value: 'min_playtime' },
        { text: "Max. Time (minutes)", value: 'max_playtime', hide: 'xsOnly' },
        { text: "Release", value: 'year_published', hide: 'smAndDown'},
      ]
    };
  },
  created() {
    this.$store.dispatch("collection/fetch");
  },
  computed: {
    games() { return this.$store.state.collection.games; },
    loadingGames() { return this.$store.state.collection.loadingGames; },
    computedHeaders() { return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide]); },
  },
  methods: {
    handleDetailClick(item) {
      this.$store.dispatch("collection/fetchOneForDetail", item._id);
      this.detailDialog = true;
    },
    searchNewButtonClick() {
      this.searchNewGamesDialog = true;
    },
  }
};
</script>

<style scoped>
.loader-container {
  height: calc(100vh - 208px);
}

@media (max-width: 600px){
  .mobile-invisible-column {
    display: none !important;
  }
}
</style>