<template>
  <v-container>
    <v-container>
      <v-row>
        <h1>Play History</h1>
        <v-spacer></v-spacer>

        <!-- Desktop Action Button (stays at the top) -->
          <v-btn class="hidden-xs-only my-auto" color="secondary" rounded to="/record">
            <v-icon>mdi-plus</v-icon>
            Record Play
          </v-btn>

        <!-- Mobile FAB (position:fixed) -->
        <v-fab-transition>
          <v-btn class="d-sm-none fab-mobile" color="secondary" fab fixed to="/record">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>

      </v-row>
    </v-container>

    <!-- Table and Search -->

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
      @click:row="handleClick"
    >
     
      <!-- <template v-slot:body>
        <tr v-for="play in plays" :key="play.id">
          <td>{{ readableDate(play.datePlayed) }}</td>
          <td>{{ gameName(play.boardGameId) }}</td>
          <td>{{ playWinnerMember(play.winnerId, play.type, play.boardWin) }}</td>
          <td>{{ play.winnerId }}</td>
        </tr>
      </template> -->

      <!-- <template v-slot:item.datePlayed=" { item }">
        {{ readableDate(item.datePlayed) }}
      </template>
      <template v-slot:item.boardGameId=" { item }">
        {{ gameName(item.boardGameId) }}
      </template>
      <template v-slot:item.winnerId=" { item }">
        {{ playWinnerMember(item.winnerId, item.type, item.boardWin) }}
      </template>
      <template v-slot:item.playersId=" { item }">
        {{ numPlayers(item.playersId) }}
      </template> -->

    </v-data-table>


    <!-- Dialog/Modal with additional information -->
    <v-dialog
      v-model="dialog"
      max-width="550px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <HistoryDetails :play="detailPlay" v-on:close-modal="dialog = false"/>
    </v-dialog>

  </v-container>
</template>

<script>
import HistoryDetails from "@/components/HistoryDetails.vue";
import HistoryFunctions from "@/mixins/HistoryFunctions.js";

export default {
  name: "History",
  components: {
    HistoryDetails,
  },
  mixins: [HistoryFunctions],
  data() {
    return {
      search: "",
      dialog: false,
      detailPlay: null,
      headers: [
        { text: "Date", value: 'readableDate' },
        { text: "Game", value: 'boardGameName' },
        { text: "Winner", value: 'winnerDisplay' },
        { text: "# Players", value: 'numPlayers', hide: 'smAndDown'},

        // The space after in the align: makes it so the class mobile-invisible-column is applied
        // { text: '', value: 'data-table-expand', hide: "smAndDown"},
      ]
    };
  },
  computed: {
    computedHeaders() {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide]);
    },

    // Takes the root data array of play objects and maps them to a new array
    // the ... operator is like Object.assign() and is creating new objects (and
    // then modifying some properties for History.vue's purposes) so that this 
    // returned list does not edit the objects stored in the root data. While 
    // mapping does create a new array, it is stil referencing the same objects.
    plays() {
      return this.$root.$data.history.map(play => {
        return {
          ...play,
          readableDate: this.readableDate(play.datePlayed),
          boardGameName: this.gameName(play.boardGameId),
          winnerDisplay: this.playWinnerMember(play.winnerId, play.type, play.boardWin),
          numPlayers: this.numPlayers(play.playersId),
        };
      });
    },

    // plays() {
    //   let plays = this.deepCopy(this.$root.$data.history);
    //   // console.log("root");
    //   // console.log(this.$root.$data.history);
    //   // console.log("plays before");
    //   console.log(plays);
    //   plays.forEach(play => {
    //     // play.datePlayed = this.readableDate(play.datePlayed);
    //     play.boardGameId = this.gameName(play.boardGameId);
    //     play.winnerId = this.playWinnerMember(play.winnerId, play.type, play.boardWin);
    //   });
    //   // console.log("plays after");
    //   // console.log(plays);
    //   return plays;
    // }
  },
  methods: {
    handleClick(item) {
      // console.log("Handle click = " + item.boardGameId);
      this.detailPlay = item;
      this.dialog = true;
      // this.highlightClickedRow(value);
      // this.viewDetails(value);
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