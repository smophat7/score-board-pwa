<template>
  <v-container>
    <h1>Group</h1>

    <!-- Table and Search -->

    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <!-- mobile-breakpoint="" eliminates the mobile table view option as I'm doing custom column visibility instead -->
    <v-data-table
      :headers="computedHeaders"
      :items="members"
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
      <MemberDetails :member="detailMember" v-on:close-modal="dialog = false"/>
    </v-dialog>

  </v-container>
</template>

<script>
import MemberDetails from "@/components/MemberDetails.vue";
// import HistoryFunctions from "@/mixins/HistoryFunctions.js";

export default {
  name: "Group",
  components: {
    MemberDetails,
  },
  // mixins: [HistoryFunctions],
  data() {
    return {
      search: "",
      dialog: false,
      detailMember: null,
      headers: [
        { text: "Joined", value: 'readableDate', hide: 'xsOnly' },
        { text: "First", value: 'firstName' },
        { text: "Last", value: 'lastName' },
        { text: "# Wins", value: 'totalWins' },
        { text: "# Games Played", value: 'gamesPlayed', hide: 'smAndDown'},
      ]
    };
  },
  computed: {
    computedHeaders() {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide]);
    },
    members() {
      return this.$root.$data.members.map(person => {
        return {
          ...person,
          readableDate: this.readableDate(person.dateJoined),
        }
      });
    }
  },
  methods: {
    handleClick(item) {
      console.log(item.fullName);
      this.detailMember = item;
      this.dialog = true;
    },
    readableDate(date) {
      return date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
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