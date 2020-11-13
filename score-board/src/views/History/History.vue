<template>
  <v-container>
    <h1>History</h1>

    <!-- Table and Search -->
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="plays"
      :search="search"
    ></v-data-table>

  </v-container>
</template>

<script>
// import enumGameType from "../assets/enumGameType.js";

export default {
  name: "History",
  data() {
    return {
      search: "",
      headers: [
        { text: "Date", value: 'datePlayed'},
        { text: "Name", value: 'boardGameId' },
        { text: "Winner", value: 'winnerId'},
      ]
    };
  },
  computed: {
    plays() {
      let plays = this.$root.$data.history;
      plays.forEach(play => {
        play.datePlayed = this.readableDate(play.datePlayed);
        play.boardGameId = this.gameName(play.boardGameId);
        play.winnerId = this.playWinnerMember(play.winnerId, play.type, play.boardWin);
      });
      return plays;
    }
  },
  methods: {
    readableDate(date) {
      return date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
    },
    gameName(gameId) {
      return this.$root.$data.shelf.find((game) => {
        return game.id === gameId;
      }).name;
    },
    idToMember(personId) {
      return this.$root.$data.members.find((member) => {
        return member.id === personId;
      });
    },
    playWinnerMember(membersId, type, ifBoardWon) {
      if (type === this.$root.$data.enumGameType.CO_OP) {
        if (ifBoardWon) {
          return "The Board";
        } else {
          return "The Group";
        }
      } else {
        let winners = [];

        // If there are multiple winners in their own sub-array, break it out just into its elements            // don't know if necessary since I think I fixed it in RecordDetails.vue
        if (Array.isArray(membersId[0])) {
          membersId = [...membersId[0]];
        }

        // For each ID value in the play.winnerId array, find the corresponding member object
        // and add it to the winners array just declared
        membersId.forEach((personId) => {
          winners.push(
            this.$root.$data.members.find((member) => {
              return member.id === personId;
            })
          );
        });

        if (winners.length > 1 || Array.isArray(winners[0])) {
          return "Multiple";
        } else {
          return winners[0].fullName;
        }
      }
    },
  },
};
</script>