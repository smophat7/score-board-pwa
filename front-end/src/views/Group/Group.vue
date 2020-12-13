<template>
  <v-container>
    <v-container>
      <v-row>
        <h1>Group</h1>
        <v-spacer></v-spacer>

        <!-- Desktop Action Button (stays at the top) -->
          <v-btn class="hidden-xs-only my-auto" color="secondary" rounded @click="addNewMemberClick">
            <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>
            Add Member
          </v-btn>

        <!-- Mobile FAB (position:fixed) -->
        <v-fab-transition>
          <v-btn class="d-sm-none fab-mobile" color="secondary" fab fixed @click="addNewMemberClick">
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
        </v-fab-transition>

      </v-row>
    </v-container>

    <v-dialog
      v-model="addNewMemberDialog"
      max-width="550px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <!-- <AddNewMember v-on:close-modal="addNewMemberDialog = false" v-on:change-to-group="getMembers"/> -->
      <AddNewMember v-on:close-modal="addNewMemberDialog = false" />
    </v-dialog>

    <!-- Table and Search -->
    <div v-if="loadingMembers" class="d-flex loader-container">
      <RingLoader class="my-auto mx-auto" :loading="loadingMembers" color="#3949ab" :size=200 />
    </div>
    <div v-if="!loadingMembers">
      <v-card-title>
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" clearable label="Search" single-line hide-details></v-text-field>
      </v-card-title>

      <!-- mobile-breakpoint="" eliminates the mobile table view option as I'm doing custom column visibility instead -->
      <v-data-table
        :headers="computedHeaders"
        :items="members"
        :search="search"
        mobile-breakpoint=""
        no-data-text="There are no members in this group... yet!"
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
      <!-- <MemberDetails :member="detailMember" v-on:close-modal="detailDialog = false" @change-to-group="getMembers"/> -->
      <!-- <MemberDetails :member="detailMember" v-on:close-modal="detailDialog = false" /> -->
      <MemberDetails v-on:close-modal="detailDialog = false" />
    </v-dialog>

  </v-container>
</template>

<script>
import MemberDetails from "@/components/MemberDetails.vue";
import AddNewMember from "@/components/AddNewMember.vue";
// import HistoryFunctions from "@/mixins/HistoryFunctions.js";

import axios from "axios";
import { RingLoader } from "@saeris/vue-spinners";

export default {
  name: "Group",
  components: {
    MemberDetails,
    AddNewMember,
    RingLoader,
  },
  data() {
    return {
      // members: [],
      // loadingMembers: false,
      search: "",
      detailDialog: false,
      addNewMemberDialog: false,
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
  created() {
    this.$store.dispatch("members/fetch");
  },
  computed: {
    members() { return this.$store.getters["members/members"]; },
    loadingMembers() { return this.$store.state.members.loadingMembers; },
    computedHeaders() {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide]);
    },
  },
  // watch: {
  //   ifGroupDataChanged() {
  //     if (this.$store.state.ifGroupChanged === true) {
  //       this.getMembers();
  //       this.$store.commit('setIfGroupChanged', false);
  //     }
  //   },
  // },
  methods: {
    handleDetailClick(item) {
      // this.detailMember = item;
      this.$store.dispatch("members/fetchOneForDetail", item.id);
      this.detailDialog = true;
    },
    addNewMemberClick() {
      this.addNewMemberDialog = true;
    },
    // readableDate(date) {
    //   return new Date(date).toLocaleDateString("en-US", {
    //     year: "2-digit",
    //     month: "2-digit",
    //     day: "2-digit",
    //   });
    // },
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