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
    ifShowJoinGroup: false,
    addByJoinCodeError: null,
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
    SET_SHOW_JOIN_GROUP(state, ifShow) {
      state.ifShowJoinGroup = ifShow;
    },
    SET_ADD_BY_JOIN_CODE_ERROR(state, error) {
      state.addByJoinCodeError = error;
    },
  },
  actions: {
    async fetch(context) {
      context.commit("LOADING_STATUS_GROUPS", true);
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
      await context.dispatch("fetch");
    },
    //  WASN'T QUITE WORKING WHEN I LAST LEFT IT
    // async addMemberToGroup(context, member) {
    //   console.log("newlyAddedMember to add to group is is: " + member);
    //   console.log("current Group id is: " + context.state.currentGroup._id);
    //   let url = "api/groups/addMemberToGroup/" + context.state.currentGroup._id;
    //   try {
    //     await axios.put(url, member, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
    //   }
    //   catch(error) {
    //     console.log(error);
    //   }
    // },
    async addMemberToGroupByJoinCode(context, joinCode) {
      let url = "api/groups/addMemberToGroupByJoinCode/" + joinCode;
      try {
        await axios.put(url, context.rootState.user.member, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
      }
      catch(error) {
        context.commit("SET_ADD_BY_JOIN_CODE_ERROR", error.response.data.message);
      }
    },
    setCurrentGroup(context, currentGroup) {
      context.commit("SET_CURRENT_GROUP", currentGroup);
    },
    changeShowJoinGroup(context, ifShow) {
      context.commit("SET_SHOW_JOIN_GROUP", ifShow);
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
    //   await context.dispatch("fetch");
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
    //   await context.dispatch("fetch");
    // },
  },
}