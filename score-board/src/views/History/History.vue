<template>
  <v-container>
    <h1>History</h1>

    <!-- Table and Search -->
    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <!-- mobile-breakpoint="" eliminates the mobile table view option as I'm doing custom column visibility instead -->
    <v-data-table
      :headers="computedHeaders"
      :items="plays"
      :search="search"
      mobile-breakpoint=""
      @click:row="handleClick"
    >
      <!-- <template slot="items" slot-scope="props">
        <tr @click="showAlert(props.item)"> -->
          <!-- <td>{{ props.item.name }}</td> -->
          <!-- <td class="text-xs-right">{{ props.item.datePlayed }}</td>
          <td class="text-xs-right">{{ props.item.boardGameId }}</td>
          <td class="text-xs-right">{{ props.item.type }}</td>
        </tr>
      </template> -->

       <!-- <template :slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td> -->
        <!-- <td class="text-xs-right">{{ props.item.datePlayed }}</td>
        <td class="text-xs-right">{{ props.item.boardGameId }}</td>
        <td class="text-xs-right" v-if="!$vuetify.breakpoint.smAndDown">{{ props.item.type }}</td>
      </template> --> -->
    
      <!-- <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-container>
            <h3>{{ item.boardGameId }}</h3>
            <p>Game Type: {{ item.type }}</p>
            <p><strong>Description: </strong>{{ item.description }}</p>
          </v-container>
        </td>
      </template> -->
    </v-data-table>

    <!-- Dialog/Modal with additional information -->
    <v-dialog
      v-model="dialog"
      width="300"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template> -->

      <v-card>
        <v-card-title class="headline grey lighten-2">
          More info about GamePlay
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


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
      dialog: false,
      headers: [
        { text: "Date", value: 'datePlayed' },
        { text: "Game", value: 'boardGameId' },
        { text: "Winner", value: 'winnerId' },
        { text: "Something?", value: 'winnerId', hide: 'smAndDown'},

        // The space after in the align: makes it so the class mobile-invisible-column is applied
        // { text: '', value: 'data-table-expand', hide: "smAndDown"},
      ]
    };
  },
  computed: {
    computedHeaders() {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide]);
    },
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
    handleClick(item) {
      console.log("Handle click = " + item.boardGameId);
      this.dialog = true;
      // this.highlightClickedRow(value);
      // this.viewDetails(value);
    },
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

<style scoped>
@media (max-width: 600px){
  .mobile-invisible-column {
    display: none !important;
  }
}
</style>