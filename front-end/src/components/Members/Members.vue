<template>
  <v-container>
    <v-container>
      <v-row>
        <h1>{{currentGroup.name}}</h1>
        <v-spacer></v-spacer>

          <!-- Invite users (with modal with join code) -->
          <v-btn class="mr-3 my-auto" color="secondary" rounded @click="inviteDialog = true">
            <v-icon class="mr-2">mdi-share-variant</v-icon>
            Invite
          </v-btn>
          <v-dialog v-model="inviteDialog" max-width="550px" transition="dialog-bottom-transition">
            <template>
              <v-card class="d-flex flex-column">
                <v-card-title class="secondary headline">
                  <div class="text-truncate white--text">
                    Invite Users
                  </div>
                </v-card-title>
                <v-card-text class="py-2">
                  <v-row align="center" justify="center">
                    <v-col class="text-center">
                      <p>To invite ScoreBoard users to join this group, they can select "Join a Group" from the group selection dropdown and input this unique group join code:</p>
                      <h4>{{ groupJoinCode }}</h4>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn block color="error" text @click="inviteDialog = false">
                    <v-icon left color="error">mdi-close-circle</v-icon>
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>

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
import { RingLoader } from "@saeris/vue-spinners";

export default {
  name: "Members",
  components: {
    MemberDetails: () => import("@/components/Members/MemberDetails.vue"),
    AddNewMember: () => import("@/components/Members/AddNewMember.vue"),
    RingLoader,
  },
  data() {
    return {
      search: "",
      inviteDialog: false,
      detailDialog: false,
      addNewMemberDialog: false,
      detailMember: null,
      headers: [
        { text: "Joined", value: 'readableDate', hide: 'xsOnly' },
        { text: "First", value: 'firstName' },
        { text: "Last", value: 'lastName' },
        { text: "Win %", value: 'winPercentageDisplay' },
        { text: "# Wins", value: 'numWins' },
        { text: "# Games Played", value: 'numPlays', hide: 'smAndDown'},
      ]
    };
  },
  async created() {
    await this.$store.dispatch("members/fetch");
    await this.$store.dispatch("groups/fetch");
  },
  computed: {
    members() { return this.$store.getters["members/members"]; },  //TODO Only get play history/stats for performance in the current group
    loadingMembers() { return this.$store.state.members.loadingMembers; },
    currentGroup() { return this.$store.state.groups.currentGroup },
    groupJoinCode() { return this.$store.state.groups.currentGroup.joinCode; },
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
    async handleDetailClick(item) {
      // this.detailMember = item;
      await this.$store.dispatch("members/fetchOneForDetail", item._id);
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