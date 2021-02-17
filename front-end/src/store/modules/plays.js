import axios from "axios";
import { formatISO, parseISO } from 'date-fns';

export default {
  namespaced: true,
  state: {
    plays: [],
    detailGame: null,
    loadingPlays: false,
    loadingDetailPlay: false,
    loadingAddNew: false,
    // loadingUpdate: false,
    loadingDelete: false,
  },
  getters: {
    plays: (state, getters, rootState, rootGetters) => {
      // Returns array of Play objects with some added properties for display purposes
      return state.plays.map(play => {        
        // Create winnerDisplay ("Multiple", "Group", someone's name, etc.)
        let winnerDisplay = "";
        if (play.type === "points.high_wins" || play.type === "points.low_wins" || play.type === "ranked") {
          if (play.winners.length === 0) {
            winnerDisplay = "None";
          }
          if (play.winners.length === 1) {
            winnerDisplay = rootGetters["members/members"].find((member) => {
              return member.id === play.winners[0];
            }).fullName;
          }
          else {
            winnerDisplay = "Multiple";
          }
        }
        else {                                                // TO-DO: what happens with co-op games?
          winnerDisplay = "???";
        }

        // Return the modified Play object
        return {
          ...play,
          readableDate: formatISO(parseISO(play.date, 'YYYY-MM-DD', new Date()), {representation: 'date'}),
          winnerDisplay: winnerDisplay,
        }
      });
    },
    detailGame: state => {
      state.detailGame["readableDateJoined"] = formatISO(parseISO(state.detailPlay.date, 'YYYY-MM-DD', new Date()), {representation: 'date'});
      return state.detailGame;
    },
  },
  mutations: {
    SAVE_PLAYS(state, plays) {
      state.plays = plays;
    },
    SET_DETAIL_PLAY(state, play) {
      state.detailGame = play;
    },
    LOADING_STATUS_PLAYS(state, ifLoading) {
      state.loadingPlays = ifLoading;
    },
    LOADING_STATUS_DETAIL_PLAY(state, ifLoading) {
      state.loadingDetailPlay = ifLoading;
    },
    LOADING_STATUS_ADD_NEW(state, ifLoading) {
      state.loadingAddNew = ifLoading;
    },
    // LOADING_STATUS_UPDATE(state, ifLoading) {
    //   state.loadingUpdate = ifLoading;
    // },
    LOADING_STATUS_DELETE(state, ifLoading) {
      state.loadingDelete = ifLoading;
    },
  },
  actions: {
    async fetch(context) {
      context.commit("LOADING_STATUS_PLAYS", true);
      let url = "/api/plays";
      try {
        let response = await axios.get(url, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
        context.commit("SAVE_PLAYS", response.data);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_PLAYS", false);
    },
    async fetchOneForDetail(context, id) {
      context.commit("LOADING_STATUS_DETAIL_PLAY", true);
      let url = "/api/plays/" + id;
      try {
        let response = await axios.get(url, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
        context.commit("SET_DETAIL_PLAY", response.data);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_DETAIL_PLAY", false);
    },
    async delete(context, playToDelete) {
      context.commit("LOADING_STATUS_DELETE", true);
      let url = "/api/plays/" + playToDelete._id;
      try {
        await axios.delete(url, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_DELETE", false);
      await context.dispatch("fetch");
    },
    async deleteFromMember(context, memberToDelete) {
      context.commit("LOADING_STATUS_DELETE", true);
      let url = "/api/plays/fromMembers/" + memberToDelete._id;
      try {
        await axios.delete(url, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_DELETE", false);
      await context.dispatch("fetch");
    },
    async deleteFromGame(context, gameToDelete) {
      context.commit("LOADING_STATUS_DELETE", true);
      let url = "/api/plays/fromGames/" + gameToDelete._id;
      try {
        await axios.delete(url, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_DELETE", false);
      await context.dispatch("fetch");
    }
  }
}