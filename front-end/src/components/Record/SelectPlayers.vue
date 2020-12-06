<template>
  <div>
    <h2>Select Players</h2>

    <!-- Selected players as chips and search bar -->
    <v-container>
      <v-row align="center" justify="start">
        <!-- Selected players -->
        <v-col v-for="(player, i) in selected" :key="player.id">
          <v-chip label close @click:close="selected.splice(i, 1)">
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
        <v-list-item v-if="!selected.includes(member)" @click="selected.push(member)" :key="member.id">
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
import axios from "axios";

export default {
  name: "SelectPlayers",
  data() {
    return {
      members: [],
      loadingMembers: false,
      selected: this.$store.state.recordPlayers,
      search: "",
    };
  },
  created() {
    this.getMembers();
  },
  computed: {
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
    async getMembers() {
      this.loadingMembers = true;
      let url = "/api/members";
      try {
        let response = await axios.get(url);
        let memberList = response.data;
        this.members = memberList.map(member => {
          return {
            ...member,
          }
        });
        this.loadingMembers = false;
      }
      catch (error) {
        console.log(error)
      }
    },
  },
  watch: {
    // Reset search bar text if one is selected
    selected() {
      this.search = "";
      this.$store.commit("updateRecordPlayers", this.selected);
      if (this.selected.length === 0) {
        this.$store.commit("changeRecordStep", 2);
      }
      else {
        this.$store.commit("changeRecordStep", 3);
        }
    },
  },
}
</script>
