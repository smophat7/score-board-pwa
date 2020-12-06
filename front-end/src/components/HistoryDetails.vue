<template>
  <v-card class="d-flex flex-column">
    <v-card-title class="secondary headline">
      <div class="text-truncate white--text">
        Play Details
      </div>
    </v-card-title>

    <v-card-text>
      <!-- <h2 class="mt-5 mb-3 text-center">Winner(s): {{ playWinnerMember(play.winnerId, play.type, play.boardWin) }}</h2> -->
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" class="text-center">
          <v-img class="img-size mx-auto my-5" :src="play.game.images.medium" :alt="play.game.name + ' game cover'"></v-img>
          <h2>{{ play.game.name }}</h2>
          <h4>{{ play.readableDate }}</h4> 
        </v-col>
        <!-- <v-col cols="12" sm="6" class="py-2"> -->

          <!-- <div v-if="isCoop">
            <h3>Players</h3>
            <v-list>
              <v-list-item v-for="memberId in play.playersId" :key="memberId">
                <v-list-item-content>
                  <v-list-item-title v-text="idToMember(memberId).fullName"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div> -->

          <!-- <div v-else> -->
          <!-- <div>
            <h3>Standings</h3>
            <v-list>
              <v-list-item v-for="(ids, index) in play.rankWinToLose" :key="ids">
                <span class="mr-2">{{ index + 1 }}. </span>
                <v-list-item-content>
                  <v-list-item-title v-text="playerRankings(ids, play)"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div> -->
        <!-- </v-col> -->
      </v-row>

      <p><strong>Description:</strong> {{ play.description }}</p>
      <p><em>More details about the game (who won, how many points people get, etc.) will be here too. Just didn't have time to figure all that out just yet!</em></p>
    </v-card-text>

    <v-spacer></v-spacer>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn block color="error" text @click="$emit('close-modal')">
        <v-icon left color="error">mdi-close-circle</v-icon>
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import HistoryFunctions from "@/mixins/HistoryFunctions.js";

export default {
  name: "HistoryDetails",
  props: {
    play: Object,
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

