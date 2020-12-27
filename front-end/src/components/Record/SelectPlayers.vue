<template>
  <div>
    <h2>Select Players</h2>

    <!-- Selected players as chips and search bar -->
    <v-container>
      <v-row align="center" justify="start">
        <!-- Selected players -->
        <v-col v-for="(player) in selected" :key="player.id">
          <v-chip label close @click:close="removeFromSelection(player)">
            <v-avatar left>
              <v-img :src="'../img/profiles/' + player.profilePicture" :alt="player.fullName + ' avatar icon'"></v-img>
            </v-avatar>
            {{ player.fullName }}
          </v-chip>
        </v-col>
        <!-- Search -->
        <v-col
            v-if="!allSelected"
            cols="12"
          >
            <v-text-field
              ref="search"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              full-width
              label="Search"
              single-line
            ></v-text-field>
          </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <!-- Unselected players in list -->
    <v-list>
      <template v-for="member in searchFilteredMembers">
        <v-list-item v-if="!selected.includes(member)" @click="addToSelection(member)" :key="member.id">
          <v-list-item-avatar>
            <v-img :src="'../img/profiles/' + member.profilePicture" :alt="member.fullName + ' avatar icon'"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ member.fullName }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

  </div>
</template>


<script>
export default {
  name: "SelectPlayers",
  data() {
    return {
      search: "",
    };
  },
  created() {
    this.$store.dispatch("members/fetch");
  },
  computed: {
    members() { return this.$store.getters["members/members"]; },
    selected: {
      set(selected) {
        this.$store.commit("record/updatePlayers", selected);
      },
      get() {
        return this.$store.state.record.players;
      },
    },
    loadingMembers() { return this.$store.state.members.loadingMembers; },
    allSelected() {
      return this.selected.length === this.members.length;
    },
    searchFilteredMembers() {
      const search = this.search.toLowerCase();
      // Return all unselected group members if the search bar is empty
      if (!search) {
        return this.members;
      }
      // Return a filtered list of the unselected group members 
      else {
        return this.members.filter(player => {
          const text = player.fullName.toLowerCase();
          return text.indexOf(search) > -1;
        });
      }
    },
  },
  methods: {
    addToSelection(player) {
      this.selected.push(player);
      this.selected = this.selected;                // seemingly redundant, but triggers Vue's
                                                    // reactivity so that the changes are actually made in Vuex
    },
    removeFromSelection(player) {
      // this.selected.splice(i, 1)
      const index = this.selected.indexOf(player);
      if (index > -1) {
        this.selected.splice(index, 1);
        this.selected = this.selected;                // seemingly redundant, but triggers Vue's
                                                    // reactivity so that the changes are actually made in Vuex
      }
    }
  },
  watch: {
    // Reset search bar text if one is selected
    selected() {
      this.search = "";
      // // this.$store.mutations.record.commit("updateRecordPlayers", this.selected);
      // if (this.selected.length === 0) {
      //   this.$store.commit("record/changeRecordStep", 2);
      // }
      // else {
      //   this.$store.commit("record/changeRecordStep", 3);
      // }
    },
  },
}
</script>