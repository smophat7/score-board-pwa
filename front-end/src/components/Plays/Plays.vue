<template>
  <v-container>
    <v-container>
      <v-row>
        <h1>Play History</h1>
        <v-spacer></v-spacer>

        <!-- Desktop Action Button (stays at the top) -->
          <v-btn class="hidden-xs-only my-auto" color="secondary" rounded to="record">
          <v-icon>mdi-plus</v-icon>
            Record Play
          </v-btn>

        <!-- Mobile FAB (position:fixed) -->
        <v-fab-transition>
          <v-btn class="d-sm-none fab-mobile" color="secondary" fab fixed to="record">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>

      </v-row>
    </v-container>


    <!-- Table and Search -->
    <div v-if="loadingPlays" class="d-flex loader-container">
      <RingLoader class="my-auto mx-auto" :loading="loadingPlays" color="#3949ab" :size=200 />
    </div>
    <div v-if="!loadingPlays">
      <v-card-title>
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" clearable label="Search" single-line hide-details></v-text-field>
      </v-card-title>

      <!-- mobile-breakpoint="" eliminates the mobile table view option as I'm doing custom column visibility instead -->
      <v-data-table
        class="margin-bottom-for-fab"
        :headers="computedHeaders"
        :items="plays"
        :search="search"
        mobile-breakpoint=""
        no-data-text="You have no recorded plays... yet!"
        no-results-text="Nothing found... try searching someting else?"
        @click:row="handleClick"
      >
      </v-data-table>
    </div>


    <!-- Dialog/Modal with additional information -->
    <v-dialog
      v-model="dialog"
      max-width="550px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <PlayDetails v-on:close-modal="dialog = false"/>
    </v-dialog>

  </v-container>
</template>

<script>
// import { formatISO, parseISO } from 'date-fns';
import { RingLoader } from "@saeris/vue-spinners";
import HistoryFunctions from "@/mixins/HistoryFunctions.js";

export default {
  name: "Play",
  components: {
    PlayDetails: () => import("@/components/Plays/PlayDetails.vue"),
    RingLoader,
  },
  mixins: [HistoryFunctions],
  data() {
    return {
      search: "",
      dialog: false,
      detailPlay: null,
      headers: [{
          text: "Date",
          value: 'readableDate'
        },
        {
          text: "Game",
          value: 'game.name'
        },
        {
          text: "Winner",
          value: 'winnerDisplay' },
        {
          text: "# Players",
          value: 'numPlayers',
          hide: 'xsAndDown'
        },

        // The space after in the align: makes it so the class mobile-invisible-column is applied
        // { text: '', value: 'data-table-expand', hide: "smAndDown"},
      ]
    };
  },
  async created() {
    await this.$store.dispatch("members/fetch");
    await this.$store.dispatch("plays/fetch");
  },
  computed: {
    plays() { return this.$store.getters["plays/plays"]; },
    loadingPlays() { return this.$store.state.plays.loadingPlays; },
    computedHeaders() {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide]);
    },
  },
  methods: {
    // handleClick(item) {
    //   this.detailPlay = item;
    //   this.dialog = true;
    // },
    async handleClick(item) {
      await this.$store.dispatch("plays/fetchOneForDetail", item._id);
      this.dialog = true;
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