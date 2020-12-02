<template>
  <v-card class="d-flex flex-column">
    <v-card-title class="secondary headline">
      <div class="text-truncate white--text">
        Member Details
      </div>
    </v-card-title>

    <v-card-text>
      <h2 class="mt-5 mb-3 text-center">{{ member.fullName }}</h2>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" class="py-2">
          <v-img class="img-size mx-auto" :src="'../img/profiles/' + member.profilePicture" :alt="member.fullName + ' profile picture'">
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
          <div class="member-details mx-auto">
            <p>Wins: <strong>{{ member.totalWins }}</strong></p>
            <p>Plays: <strong>{{ member.gamesPlayed }}</strong></p>
            <p>Win Rate: <strong>{{ percentWin(member.totalWins, member.gamesPlayed) }}%</strong></p>
          </div>
        </v-col>
      </v-row>

      <!-- <p><strong>Description:</strong> {{ play.description }}</p> -->
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
// import HistoryFunctions from "@/mixins/HistoryFunctions.js";

export default {
  name: "MemberDetails",
  props: {
    member: Object,
  },
  // mixins: [HistoryFunctions],
  computed: {
    // isCoop() {
    //   return this.play.type === this.$root.$data.enumGameType.CO_OP;
    // }
  },
  methods: {
    percentWin(won, total) {
      return ((won / total) * 100).toFixed(2);
    },
  },
};
</script>

<style scoped>
.member-details {
  width: 150px;
}

@media (max-width: 600px) {
  .img-size {
    max-width: 200px;
  }
  .member-details {
    text-align: center;
  }
}
</style>