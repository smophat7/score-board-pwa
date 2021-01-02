export default {
  methods: {
    readableDate(date) {
      return date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
    },
    gameName(gameId) {
      // console.log(gameId);
      return this.$root.$data.shelf.find((game) => {
        return game.id === gameId;
      }).name;
    },
    gameImageSrc(gameId) {
      return this.$root.$data.shelf.find((game) => {
        return game.id === gameId;
      }).images.medium;
    },
    // idToMember(personId) {
    //   return this.$root.$data.members.find((member) => {
    //     return member.id === personId;
    //   });
    // },
    idToMember(memberId) {
      return this.$store.getters["members/members"].find((member) => {
        return member.id === memberId;
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
    numPlayers(playersId) {
      return playersId.length;
    },
    gameType(typeEnum) {
      switch (typeEnum) {
        case this.$root.$data.enumGameType.POINTS.HIGH_WINS:
          return "Points (highest wins)";
        case this.$root.$data.enumGameType.POINTS.LOW_WINS:
          return "Points (lowest wins)";
        case this.$root.$data.enumGameType.RANKED:
          return "Ranked";
        case this.$root.$data.enumGameType.VS_BOARD:
          return "Group vs Board";
      }
    },
    playerRankings(ids, play) {
      //If there isn't a tie for first
      if (!Array.isArray(ids)) {
        let result = this.idToMember(ids).fullName;
        if (
          play.type === this.$root.$data.enumGameType.POINTS.HIGH_WINS ||
          play.type === this.$root.$data.enumGameType.POINTS.LOW_WINS
          ) {
            result += ": " + play.points[ids] + " pts";
          }
          return result;
        } else {
          
          // // If there are multiple members in their own sub-array, break it out just into its elements
          // if (Array.isArray(ids[0])) {
          //   ids = [...ids[0]];
          // }
          
          let result = this.idToMember(ids[0]).fullName;
          for (let i = 1; i < ids.length; i++) {
            result += ", " + this.idToMember(ids[i]).fullName;
          }
          if (play.type === this.$root.$data.enumGameType.POINTS.HIGH_WINS || play.type === this.$root.$data.enumGameType.POINTS
            .LOW_WINS) {
              // console.log(result);
          result += ": " + play.points[ids[0]] + " pts";
        }
        return result;
      }
    },
    getPoints(play, id) {
      return play.points[id];
    },

    //Thanks to https://medium.com/@ziyoshams/deep-copying-javascript-arrays-4d5fc45a6e3e
    // set up a function that iterates through a given array
    // if one of the elements is an array, call itself with that element
    // if elements of the array is an object, we make sure to take care of that too.
    // deepCopy(arr) {
    //   let copy = [];
    //   arr.forEach(elem => {
    //     if (Array.isArray(elem)) {
    //       copy.push(this.deepCopy(elem))
    //     } else {
    //       if (typeof elem === 'object') {
    //         copy.push(this.deepCopyObject(elem))
    //       } else {
    //         copy.push(elem)
    //       }
    //     }
    //   })
    //   return copy;
    // },
    // // Helper function to deal with Objects
    // deepCopyObject(obj) {
    //   let tempObj = {};
    //   for (let [key, value] of Object.entries(obj)) {
    //     if (Array.isArray(value)) {
    //       tempObj[key] = this.deepCopy(value);
    //     } 
    //     // Adding this didn't do it...
    //     // else if (obj instanceof Date) {
    //     //   tempObj[key] = (new Date(obj));
    //     // }
    //     else {
    //       if (typeof value === 'object') {
    //         tempObj[key] = this.deepCopyObject(value);
    //       } else {
    //         tempObj[key] = value
    //       }
    //     }
    //   }
    //   return tempObj;
    // }
  }
}