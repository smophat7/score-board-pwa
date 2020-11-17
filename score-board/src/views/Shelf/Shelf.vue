<template>
  <v-container>
    <h1>Shelf</h1>

    <!-- Table and Search -->

    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <!-- mobile-breakpoint="" eliminates the mobile table view option as I'm doing custom column visibility instead -->
    <v-data-table
      :headers="computedHeaders"
      :items="games"
      :search="search"
      mobile-breakpoint=""
      @click:row="handleClick"
    >

    </v-data-table>


    <!-- Dialog/Modal with additional information -->
    <v-dialog
      v-model="dialog"
      max-width="550px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <GameDetails :game="detailGame" v-on:close-modal="dialog = false"/>
    </v-dialog>

  </v-container>
</template>

<script>
import GameDetails from "@/components/GameDetails.vue";
// import HistoryFunctions from "@/mixins/HistoryFunctions.js";

export default {
  name: "Shelf",
  components: {
    GameDetails,
  },
  // mixins: [HistoryFunctions],
  data() {
    return {
      search: "",
      dialog: false,
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
  computed: {
    computedHeaders() {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide]);
    },
    games() {
      return this.$root.$data.shelf.map(game => {
        return {
          ...game,
        }
      });
    }
  },
  methods: {
    handleClick(item) {
      console.log(item.fullName);
      this.detailGame = item;
      this.dialog = true;
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