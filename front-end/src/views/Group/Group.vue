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
      <AddNewMember v-on:close-modal="addNewMemberDialog = false" v-on:change-to-group="getMembers"/>
    </v-dialog>

    <!-- Table and Search -->

    <v-card-title>
      <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" clearable label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <!-- mobile-breakpoint="" eliminates the mobile table view option as I'm doing custom column visibility instead -->
    <v-data-table
      :headers="computedHeaders"
      :items="members"
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
      <MemberDetails :member="detailMember" v-on:close-modal="detailDialog = false" @change-to-group="getMembers"/>
    </v-dialog>

  </v-container>
</template>

<script>
import MemberDetails from "@/components/MemberDetails.vue";
import AddNewMember from "@/components/AddNewMember.vue";
// import HistoryFunctions from "@/mixins/HistoryFunctions.js";

import axios from "axios";

export default {
  name: "Group",
  components: {
    MemberDetails,
    AddNewMember,
  },
  // mixins: [HistoryFunctions],
  data() {
    return {
      members: [],
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
    this.getMembers();
  },
  computed: {
    computedHeaders() {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide]);
    },
    ifGroupDataChanged() {
      return this.$store.state.ifGroupChanged;
    }
    // members() {
    //   return this.$root.$data.members.map(person => {
    //     return {
    //       ...person,
    //       readableDate: this.readableDate(person.dateJoined),
    //     }
    //   });
    // }
  },
  watch: {
    ifGroupDataChanged() {
      if (this.$store.state.ifGroupChanged === true) {
        this.getMembers();
        this.$store.commit('setIfGroupChanged', false);
      }
    }
  },
  methods: {
    async getMembers() {
      let url = "http://localhost:3000/members";
      try {
        let response = await axios.get(url);
        let memberList = response.data;
        this.members = memberList.map(member => {
          return {
            ...member,
            readableDate: this.readableDate(member.dateJoined),
          }
        });
      }
      catch (error) {
        console.log(error)
      }
    },
    handleDetailClick(item) {
      this.detailMember = item;
      this.detailDialog = true;
    },
    addNewMemberClick() {
      this.addNewMemberDialog = true;
    },
    readableDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
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