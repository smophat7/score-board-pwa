<template>
  <div class="button-width">

    <v-menu v-model="groupSelectDropdown" close-on-click close-on-content-click :top="dropAbove" :bottom="dropBelow" offset-y class="group-menu-align">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" block color="secondary">
          <span v-if="currentGroup" class="truncate">{{ currentGroup.name }}</span>
          <span v-else>No Group</span>
          <v-icon v-if="groupSelectDropdown">mdi-chevron-up</v-icon>
          <v-icon v-else>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="group in groups" :key="group.id" @click="changeGroup(group)" class="px-4">
          <span>{{ group.name }}</span>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="showJoinGroup" class="px-4">
          <v-icon class="pr-3">mdi-account-arrow-right</v-icon>
          <span class="mx-auto">Join a Group</span>
        </v-list-item>
        <v-list-item @click="showCreateGroup" class="px-4">
          <v-icon class="pr-3">mdi-plus</v-icon>
          <span class="mx-auto">Create a Group</span>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
      v-model="createGroupDialog"
      max-width="550px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <CreateGroup v-on:close-modal="createGroupDialog = false"/>
    </v-dialog>
    <v-dialog
      v-model="joinGroupDialog"
      max-width="550px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <JoinGroup v-on:close-modal="joinGroupDialog = false"/>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "GroupSelectExpanded",
  components: {
    JoinGroup: () => import("@/components/GroupManagement/JoinGroup"),
    CreateGroup: () => import("@/components/GroupManagement/CreateGroup"),
  },
  props: {
    dropAbove: Boolean,
    dropBelow: Boolean,
  },
  data() {
    return {
      groupSelectDropdown: false,
      joinGroupDialog: false,
      createGroupDialog: false,
    }
  },
  computed: {
    currentGroup() { return this.$store.state.groups.currentGroup; },
    groups() { return this.$store.state.groups.groups; }
  },
  methods: {
    async changeGroup(group) {
      this.$store.dispatch("groups/setCurrentGroup", group);
      // Re-fetch everything (probably a way to specify only the active page, which would be better, just need to record that in state
      await this.$store.dispatch("members/fetch");
      await this.$store.dispatch("collection/fetch");
      await this.$store.dispatch("plays/fetch");
    },
    showJoinGroup() {
      this.joinGroupDialog = true;
    },
    showCreateGroup() {
      this.createGroupDialog = true;
    }
  },
}
</script>

<style scoped>

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

@media (max-width: 600px){
  .truncate {
    max-width: 75vw;
  }
}

.button-width {
  max-width: 100%;
}

</style>