import Vue from "vue";
import Vuex from "vuex";

import authentication from "./modules/authentication";
import collection from "./modules/collection";
import members from "./modules/members";
import plays from "./modules/plays";
import record from "./modules/record";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    ifMemberEditComponent: false,     // Controls what to view within MemberDetails.vue
    ifGameEditComponent: false,       // Controls what to view within GameDetails.vue
  },
  getters: { },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    setIfMemberEditComponent(state, isEditing) {
      state.ifMemberEditComponent = isEditing;
    },
    setIfGameEditComponent(state, isEditing) {
      state.ifGameEditComponent = isEditing;
    },
  },
  actions: {
    fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        context.commit("SET_USER", null);
      }
    }
  },
  modules: {
    authentication,
    collection,
    members,
    plays,
    record,
  },
});

export default store;