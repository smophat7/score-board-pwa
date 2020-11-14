<template>
  <v-card class="d-flex flex-column">
    <v-card-title class="secondary headline">
      <div class="text-truncate white--text">
        {{readableDate(play.datePlayed)}} - {{ gameName(play.boardGameId) }}
      </div>
    </v-card-title>

    <v-card-text>
      <h2 class="mt-5 mb-3 text-center">Winner(s): {{ playWinnerMember(play.winnerId, play.type, play.boardWin) }}</h2>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" class="py-2">
          <v-img class="img-size mx-auto" :src="gameImageSrc(play.boardGameId)" :alt="gameName(play.boardGameId) + ' game cover'">
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
        <v-col cols="12" sm="6" class="py-2">
          <div v-if="isCoop">
            <h3>Players</h3>
            <v-list>
              <v-list-item v-for="memberId in play.playersId" :key="memberId">
                <v-list-item-content>
                  <v-list-item-title v-text="idToMember(memberId).fullName"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            
          </div>
          <div v-else>
            <h3>Standings</h3>
            <v-list>
              <v-list-item v-for="(ids, index) in play.rankWinToLose" :key="ids">
                <span class="mr-2">{{ index + 1 }}. </span>

                <!-- <v-list-item-avatar>
                <v-img :src="idToMember(ids).profilePicture"></v-img>
              </v-list-item-avatar> -->

                <v-list-item-content>
                  <v-list-item-title v-text="playerRankings(ids, play)"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
      </v-row>

      <p><strong>Description:</strong> {{ play.description }}</p>
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
  name: "HistoryDetails",
  props: {
    play: Object,
  },
  mixins: [HistoryFunctions],
  computed: {
    isCoop() {
      return this.play.type === this.$root.$data.enumGameType.CO_OP;
    }
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

