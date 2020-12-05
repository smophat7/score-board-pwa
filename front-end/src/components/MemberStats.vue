<template>
  <v-card class="d-flex flex-column full-screen-modal">
    
    <v-card-title class="secondary headline">
      <div class="text-truncate white--text">
        Details
      </div>
      <v-spacer></v-spacer>
      <v-btn color="error" class="mr-5" @click="deleteMember">
        <v-progress-circular v-if="deleteLoading"
            indeterminate
            color="white"
          ></v-progress-circular>
        <v-icon v-else color="white">mdi-delete-forever</v-icon>
      </v-btn>
      <v-btn color="primary" @click="$store.commit('setIfMemberEditComponent', true)">
        <v-icon color="white">mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <h2 class="mt-5 mb-3 text-center">{{ member.fullName }}</h2>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" class="py-2">
          <v-img class="img-size mx-auto" :src="'../img/profiles/' + member.profilePicture" :alt="member.fullName + ' profile picture'"></v-img>
        </v-col>
        <v-col cols="12" sm="6" class="py-2">
          <div class="member-stats mx-auto">
            <p>{ An overview of their play history and fun stats (maybe some graphs and such) will go here. }</p>
            <p>{ An overview of their play history and fun stats (maybe some graphs and such) will go here. }</p>
            <p>{ An overview of their play history and fun stats (maybe some graphs and such) will go here. }</p>
            <p>{ An overview of their play history and fun stats (maybe some graphs and such) will go here. }</p>
            <p>{ An overview of their play history and fun stats (maybe some graphs and such) will go here. }</p>
            <p>{ An overview of their play history and fun stats (maybe some graphs and such) will go here. }</p>
            <p>{ An overview of their play history and fun stats (maybe some graphs and such) will go here. }</p>
            <p>{ An overview of their play history and fun stats (maybe some graphs and such) will go here. }</p>
            <p>{ An overview of their play history and fun stats (maybe some graphs and such) will go here. }</p>
            <!-- <p>Wins: <strong>{{ member.totalWins }}</strong></p>
            <p>Plays: <strong>{{ member.gamesPlayed }}</strong></p>
            <p>Win Rate: <strong>{{ percentWin(member.totalWins, member.gamesPlayed) }}%</strong></p> -->
          </div>
        </v-col>
      </v-row>
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
import axios from "axios";

export default {
  name: "MemberStats",
  props: {
    member: Object,
  },
  data() {
    return {
      deleteLoading: false,
    }
  },
  methods: {
    async deleteMember() {
      this.deleteLoading = true;
      let url = "/api/members/" + this.member.id;
      try {
        await axios.delete(url);
      }
      catch (error) {
        console.log(error);
      }
      this.deleteLoading = false;
      this.$store.commit('setIfGroupChanged', true);
      this.$emit("close-modal");
    },
    percentWin(won, total) {
      return ((won / total) * 100).toFixed(2);
    },
  },
};
</script>

<style scoped>
/* .full-screen-modal {
  height: 100%;
} */

.member-stats {
  width: 200px;
}

@media (max-width: 600px) {
  .img-size {
    max-width: 200px;
  }
  .member-stats {
    text-align: center;
  }
}
</style>