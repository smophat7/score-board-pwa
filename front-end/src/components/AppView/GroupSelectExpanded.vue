<template>
  <v-menu v-model="groupSelectDropdown" close-on-click close-on-content-click :top="dropAbove" :bottom="dropBelow" offset-y class="group-menu-align">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" block color="secondary">
        <span v-if="currentGroup">{{ currentGroup.name }}</span>
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
      <v-list-item @click="" class="px-4">
        <v-icon class="pr-3">mdi-account-arrow-right</v-icon>
        <span class="mx-auto">Join a Group</span>
      </v-list-item>
      <v-list-item @click="" class="px-4">
        <v-icon class="pr-3">mdi-plus</v-icon>
        <span class="mx-auto">Create a Group</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "GroupSelectExpanded",
  props: {
    dropAbove: Boolean,
    dropBelow: Boolean,
  },
  data() {
    return {
      groupSelectDropdown: false,
    }
  },
  computed: {
    currentGroup() { return this.$store.state.groups.currentGroup; },
    groups() { return this.$store.state.groups.groups; }
  },
  methods: {
    changeGroup(group) {
      this.$store.dispatch("setCurrentGroup", group);
    }
  },
}
</script>