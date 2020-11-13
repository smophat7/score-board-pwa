<template>
  <v-container>
    <h1>History</h1>

    <!-- Table and Search -->
    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="plays"
      :search="search"
      single-expand
      item-key="id"
      show-expand
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-container>
            <h3>{{ item.boardGameId }}</h3>
            <p>Game Type: {{ item.type }}</p>
            <p><strong>Description: </strong>{{ item.description }}</p>
          </v-container>
        </td>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      search: "",
      // expanded: [],
      // singleExpand: true,
      headers: [
        { text: "Date", value: 'datePlayed' },
        { text: "Name", value: 'boardGameId' },
        { text: "Winner", value: 'winnerId' },
        { text: '', value: 'data-table-expand' },
      ]
    };
  },
  computed: {
    plays() {
      let plays = this.deepCopy(this.$root.$data.history);
      // console.log("root");
      // console.log(this.$root.$data.history);
      // console.log("plays before");
      console.log(plays);
      plays.forEach(play => {
        // play.datePlayed = this.readableDate(play.datePlayed);
        play.boardGameId = this.gameName(play.boardGameId);
        play.winnerId = this.playWinnerMember(play.winnerId, play.type, play.boardWin);
      });
      // console.log("plays after");
      // console.log(plays);
      return plays;
    }
  },
  methods: {
    readableDate(date) {
      console.log(date);
      return date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
    },
    gameName(gameId) {
      console.log(gameId);
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

    //Thanks to https://medium.com/@ziyoshams/deep-copying-javascript-arrays-4d5fc45a6e3e
    // set up a function that iterates through a given array
    // if one of the elements is an array, call itself with that element
    // if elements of the array is an object, we make sure to take care of that too.
    deepCopy(arr) {
      let copy = [];
      arr.forEach(elem => {
        if (Array.isArray(elem)) {
          copy.push(this.deepCopy(elem))
        } else {
          if (typeof elem === 'object') {
            copy.push(this.deepCopyObject(elem))
          } else {
            copy.push(elem)
          }
        }
      })
      return copy;
    },
    // Helper function to deal with Objects
    deepCopyObject(obj) {
      let tempObj = {};
      for (let [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
          tempObj[key] = this.deepCopy(value);
        } 
        // Adding this didn't do it...
        // else if (obj instanceof Date) {
        //   tempObj[key] = (new Date(obj));
        // }
        else {
          if (typeof value === 'object') {
            tempObj[key] = this.deepCopyObject(value);
          } else {
            tempObj[key] = value
          }
        }
      }
      return tempObj;
    }
  },
};
</script>