<template>
  <v-card class="d-flex flex-column">
    <v-card-title class="secondary headline">
      <div class="text-truncate white--text">
        {{ gameName(game.id) }}
      </div>
    </v-card-title>

    <v-card-text>
      <!-- <h2 class="mt-5 mb-3 text-center">Winner(s): {{ playWinnerMember(play.winnerId, play.type, play.boardWin) }}</h2> -->
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" class="py-2">
          <v-img class="img-size mx-auto" :src="game.images.medium" :alt="game.name + ' game cover'">
            <!-- <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template> -->
          </v-img>
        </v-col>
        <!-- <v-col class="d-sm-none">
          <v-divider ></v-divider>
        </v-col> -->
        <v-col cols="12" sm="6" class="py-4">
          <h3>Details</h3>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Minimum age: <strong>{{game.min_age}}</strong></v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-title>Min. Players: <strong>{{game.min_players}}</strong></v-list-item-title>
                <v-list-item-title>Max. Players: <strong>{{game.max_players}}</strong></v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-title>Min. Time: <strong>{{game.min_playtime}}</strong></v-list-item-title>
                <v-list-item-title>Max. Time: <strong>{{game.max_playtime}}</strong></v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-title>Published: <strong>{{game.year_published}}</strong></v-list-item-title>
                <v-list-item-title>Publisher: <strong>{{game.primary_publisher}}</strong></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      
      <v-row justify="space-around" class="pb-4">
        <v-btn width="125px" :href="game.official_url" target="_blank" color="primary">Offical Site</v-btn>
        <v-btn width="100px" :href="game.rules_url" target="_blank" color="primary">Rule Book</v-btn>
      </v-row>

      <p><strong>Description:</strong> {{ game.description_preview }}</p>
    </v-card-text>

    <v-spacer></v-spacer>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn block color="secondary" text @click="$emit('close-modal')">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import HistoryFunctions from "@/mixins/HistoryFunctions.js";

export default {
  name: "GameDetails",
  props: {
    game: Object,
  },
  mixins: [HistoryFunctions],
  computed: {
    // isCoop() {
    //   return this.play.type === this.$root.$data.enumGameType.CO_OP;
    // }
  },
  methods: {},
};
</script>

<style scoped>
@media (max-width: 600px) {
  .img-size {
    max-width: 200px;
  }
}
</style>

