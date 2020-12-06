<template>
  <div>
    <h2>Select Game</h2>
    <v-container v-if="selected != null">
      <v-chip label close @click:close="removeSelection">
        <v-avatar left>
          <v-img :src="selected.images.thumb" :alt="selected.name + ' game cover'"></v-img>
        </v-avatar>
        {{ selected.name }}
      </v-chip>
    </v-container>
    <v-container>
      <v-text-field
        ref="search"
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        full-width
        label="Search"
        single-line
      ></v-text-field>
    </v-container>

    <v-divider></v-divider>

      <v-list>
      <template v-for="game in searchFilteredGames">
        <v-list-item v-if="selected != game" @click="makeSelection(game)" :key="game._id">
          <v-img class="mr-3" :src="game.images.thumb" :alt="game.name + ' game cover'"></v-img>
          <v-list-item-title>{{ game.name }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SelectGame",
  data() {
    return {
      games: [],
      loadingGames: false,
      selected: this.$store.state.recordGame,
      search: "",
    };
  },
  created() {
    this.getCollection();
  },
  computed: {
    searchFilteredGames() {
      const search = this.search.toLowerCase();

      // Return all unselected group members if the search bar is empty
      if (!search) {
        return this.games;
      }

      return this.games.filter(game => {
        const text = game.name.toLowerCase();
        return text.indexOf(search) > -1;
      });
    },
  },
  methods: {
    async getCollection() {
      this.loadingGames = true;
      let url = "http://localhost:3000/collection";

      try {
        let response = await axios.get(url);
        let gameList = response.data;
        this.games = gameList.map(game => {
          return {
            ...game,
          }
        });
        this.loadingGames = false;
      }
      catch (error) {
        console.log(error)
      }
    },
    makeSelection(game) {
      this.selected = game;
      // this.$store.commit("changeRecordStep", 2);
    },
    removeSelection() {
      this.selected = null;
      // this.$store.commit("changeRecordStep", 1);
    },
  },
  watch: {
    // Reset search bar text if one is selected
    selected() {
      this.search = "";
      this.$store.commit("updateRecordGame", this.selected);
      if (this.selected === null) {
        this.$store.commit("changeRecordStep", 1);
      }
      else {
        this.$store.commit("changeRecordStep", 2);
      }
    },
  },
}
</script>