import axios from "axios";

export default {
  namespaced: true,
  state: {
    groups: [],
    currentGroup: null,
    loadingGroups: false,
    loadingCurrentGroup: false,
    loadingAddNew: false,
    loadingUpdate: false,
    loadingDelete: false,
  },
  getters: { },
  mutations: {
    SAVE_GROUPS(state, groups) {
      state.groups = groups;
    },
    SET_CURRENT_GROUP(state, group) {
      state.currentGroup = group;
    },
    LOADING_STATUS_GROUPS(state, ifLoading) {
      state.loadingGroups = ifLoading;
    },
    LOADING_STATUS_CURRENT_GROUP(state, ifLoading) {
      state.loadingCurrentGroup = ifLoading;
    },
    LOADING_STATUS_ADD_NEW(state, ifLoading) {
      state.loadingAddNew = ifLoading;
    },
    LOADING_STATUS_UPDATE(state, ifLoading) {
      state.loadingUpdate = ifLoading;
    },
    LOADING_STATUS_DELETE(state, ifLoading) {
      state.loadingDelete = ifLoading;
    },
  },
  actions: {
    async fetch(context) {
      context.commit("LOADING_STATUS_GROUPS", true);
      console.log("url for get groups: " + context.rootState.user.member.id)
      let url = "/api/groups/" + context.rootState.user.member.id;
      try {
        let response = await axios.get(url, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
        context.commit("SAVE_GROUPS", response.data);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_GROUPS", false);
    },
    // async fetchOneForDetail(context, id) {
    //   context.commit("LOADING_STATUS_CURRENT_GROUP", true);
    //   let url = "/api/groups/" + id;
    //   try {
    //     let response = await axios.get(url);
    //     context.commit("SET_CURRENT_GROUP", response.data);
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    //   context.commit("LOADING_STATUS_CURRENT_GROUP", false);
    // },
    async add(context, group) {
      context.commit("LOADING_STATUS_ADD_NEW", true);
      let url = "/api/groups";
      try {
        await axios.post(url, group, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_ADD_NEW", false);
      context.dispatch("fetch");
    },
    // async update(context, payload) {
    //   let currentGameId = payload.currentGameId;
    //   let updatedGame = payload.updatedGame;
    //   context.commit("LOADING_STATUS_UPDATE", true);
    //   let url = "/api/collection/" + currentGameId;
    //   try {
    //     let response = await axios.put(url, updatedGame);
    //     context.commit("SET_DETAIL_GROUP", response.data);
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    //   context.commit("LOADING_STATUS_UPDATE", false);
    //   context.dispatch("fetch");
    // },
    // async cascadeDelete(context, gameToDelete) {
    //   context.commit("LOADING_STATUS_DELETE", true);
    //   await context.dispatch("plays/deleteFromGame", gameToDelete, { root: true });
    //   await context.dispatch("delete", gameToDelete);
    //   context.commit("LOADING_STATUS_DELETE", false);
    // },
    // async delete(context, gameToDelete) {
    //   let url = "/api/collection/" + gameToDelete._id;
    //   try {
    //     await axios.delete(url);
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    //   context.dispatch("fetch");
    // },
  },
}