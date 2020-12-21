import axios from "axios";
import { formatISO, parseISO } from 'date-fns';

export default {
  namespaced: true,
  state: {
    plays: [],
    loadingPlays: false,
    loadingDelete: false,
  },
  getters: {
    plays: state => {
      return state.plays.map(play => {
        return {
          ...play,
          readableDate: formatISO(parseISO(play.date, 'YYYY-MM-DD', new Date()), {representation: 'date'}),
        }
      });
    },
  },
  mutations: {
    SAVE_PLAYS(state, plays) {
      state.plays = plays;
    },
    LOADING_STATUS_PLAYS(state, ifLoading) {
      state.loadingPlays = ifLoading;
    },
    LOADING_STATUS_DELETE(state, ifLoading) {
      state.loadingDelete = ifLoading;
    },
  },
  actions: {
    async fetch(context) {
      context.commit("LOADING_STATUS_PLAYS", true);
      let url = "/api/plays";
      try {
        let response = await axios.get(url);
        context.commit("SAVE_PLAYS", response.data);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_PLAYS", false);
    },
    async delete(context, playToDelete) {
      context.commit("LOADING_STATUS_DELETE", true);
      let url = "/api/plays/" + playToDelete._id;
      try {
        await axios.delete(url);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_DELETE", false);
      context.dispatch("fetch");
    },
    async deleteFromMember(context, memberToDelete) {
      context.commit("LOADING_STATUS_DELETE", true);
      let url = "/api/plays/fromMembers/" + memberToDelete._id;
      try {
        await axios.delete(url);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_DELETE", false);
      context.dispatch("fetch");
    },
    async deleteFromGame(context, gameToDelete) {
      context.commit("LOADING_STATUS_DELETE", true);
      let url = "/api/plays/fromGames/" + gameToDelete._id;
      try {
        await axios.delete(url);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_DELETE", false);
      context.dispatch("fetch");
    }
  }
}