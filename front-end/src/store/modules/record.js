import axios from "axios";
import { parseISO } from "date-fns";

export default {
  namespaced: true,
  state: {
    recordStep: 1,                    // Which step of the record game wizard the user is in
    players: [],                      // Players in the game play being recorded
    game: null,                       // Which game is being recorded
    recordGameType: "",               // Which game type is being recorded
    recordPoints: null,               // In points game, an object with keys (member id) to value (points)
    recordRank: [],                   // In ranked game, array of arrays for each possible ranked position
    recordCoopWin: false,             // In co-op, true if the players won
    recordDescription: "",            // What written description is to be recorded
    recordDate: new Date(),           // Date the game was played
    loadingRecordNew: false,
  },
  getters: {
    ifCanAdvance: state => {
      switch (state.recordStep) {
        case 1: // User has selected the game
          return state.game != null;
        case 2: // User has selected at least one player
          return state.players.length > 0;
        case 3: // User has selected a game type
          return state.recordGameType != "";
        case 4: // User has assigned points for all players
                                                // I DON'T LIKE HOW HACKY THIS IS. I NEED TO BE ABLE TO ACCESS THE ENUM DIRECTLY
          if (state.recordGameType === "points.high_wins" ||
            state.recordGameType === "points.low_wins") {
            if (state.recordPoints != null) {
              return (Object.values(state.recordPoints).indexOf("") <= -1 && Object.values(state.recordPoints).indexOf(null) <= -1);
            }
            else { return false; }
          }
          else if (state.recordGameType === "ranked") {
            let numRanked = 0;
            for (let i = 0; i < state.recordRank.length; i++) {
              numRanked += state.recordRank[i].length;
            }
            return numRanked === state.players.length;
          }
          else if (state.recordGameType === "co_op") {
            return true;
          }
      }
    },
  },
  mutations: {
    updateRecordStep(state, step) {
      state.recordStep = step;
    },
    updatePlayers(state, players) {
      state.players = players;
    },
    clearRecordValues(state) {
      state.players = [];
    },
    updateGame(state, game) {
      state.game = game;
    },
    updateRecordGameType(state, type) {
      state.recordGameType = type;
    },
    updateRecordPoints(state, pointAssignment) {
      state.recordPoints = pointAssignment;
    },
    updateRecordRank(state, ranking) {
      state.recordRank = ranking;
    },
    updateRecordCoopWin(state, ifGroupWin) {
      state.recordCoopWin = ifGroupWin;
    },
    updateRecordDescription(state, text) {
      state.recordDescription = text;
    },
    updateRecordDate(state, date) {
      state.recordDate = date;
    },
    clearRecordState(state) {
      state.recordStep = 1;
      state.players = [];
      state.game = null;
      state.recordRank = null;
      state.recordCoopWin = false;
      state.recordDescription = "";
      state.recordDate = new Date();
    },
    LOADING_STATUS_RECORD_NEW(state, ifLoading) {
      state.loadingRecordNew = ifLoading;
    },
  },
  actions: {
    async add(context) {
      context.commit("LOADING_STATUS_RECORD_NEW", true);

      // Create array of member ids instead of member objects to include in newPlay for DB
      let gamePlayers = context.state.players.map(playerObj => {
        return playerObj.id;
      });

      // Get an array of the winner(s) - Member IDs
      let winners = [];
      switch (context.state.recordGameType) {
        case "points.high_wins":
          let points = Object.values(context.state.recordPoints);
          let highestPoints = Math.max(...points);
          let keys = Object.keys(context.state.recordPoints);
          let membersWithWinningPoints = keys.filter(key => {
            return context.state.recordPoints[key] === highestPoints;
          })
          winners = membersWithWinningPoints;
          break;
        case "points.low_wins":
          points = Object.values(context.state.recordPoints);
          let lowestPoints = Math.min(...points);
          keys = Object.keys(context.state.recordPoints);
          membersWithWinningPoints = keys.filter(key => {
            return context.state.recordPoints[key] === lowestPoints;
          })
          winners = membersWithWinningPoints;
          break;
        case "ranked":
          for (let i = 0; i < context.state.recordRank; i++) {
            if (context.state.recordRank[i] != null) {
              winners = context.state.recordRank[i]
              break;
            }
          }
          break;
        case "co_op":                                                   // DO THIS ONE LATER
          winners = [];
          break;
        default:
          break;
      }

      // Create new play object to post to DB
      let newPlay = {
        players: gamePlayers,
        winners: winners,
        numPlayers: gamePlayers.length,
        game: context.state.game._id,
        type: context.state.recordGameType,
        points: context.state.recordPoints,
        ranking: context.state.recordRank,
        coopWin: context.state.recordCoopWin,
        description: context.state.recordDescription,
        date: parseISO(context.state.recordDate, 'YYYY-MM-DD', new Date()),
      };

      // Post new Play object to DB
      let url = "/api/plays/" + context.rootState.groups.currentGroup._id;
      try {
        await axios.post(url, newPlay, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_RECORD_NEW", false);
    }
  },
}