import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";

import collection from "./modules/collection";
import members from "./modules/members";
import groups from "./modules/groups";
import plays from "./modules/plays";
import record from "./modules/record";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
      idToken: null,
      member: null,
    },
    registerErrorMessage: null,
    ifMemberEditComponent: false,     // Controls what to view within MemberDetails.vue
    ifGameEditComponent: false,       // Controls what to view within GameDetails.vue
  },
  getters: { },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER_DATA(state, data) {
      state.user.data = data;
    },
    SET_USER_IDTOKEN(state, firebaseIdToken) {
      state.user.idToken = firebaseIdToken;
    },
    SET_USER_MEMBER(state, userMember) {
      state.user.member = userMember;
    },
    SET_REGISTER_ERROR_MESSAGE(state, errorMessage) {
      state.registerErrorMessage = errorMessage;
    },
    setIfMemberEditComponent(state, isEditing) {
      state.ifMemberEditComponent = isEditing;
    },
    setIfGameEditComponent(state, isEditing) {
      state.ifGameEditComponent = isEditing;
    },
  },
  actions: {
    async createNewUser(context, newUser) {
      let email = newUser.email;
      let password = newUser.password;
      try {
        console.log("About to create new user with email and password");
        let responseData = await firebase.auth().createUserWithEmailAndPassword(email, password);
        let fullName = this.firstName + " " + this.lastName;
        await responseData.user.updateProfile({ displayName: fullName });
      }
      catch(error) {
        context.commit("SET_REGISTER_ERROR_MESSAGE", error.message);
      }
    },
    setUserData(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER_DATA", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      }
      else {
        context.commit("SET_USER_DATA", null);
      }
    },
    setIdToken(context, idToken) {
      context.commit("SET_USER_IDTOKEN", idToken);
    },
    async setUserMember(context) {
      // console.log("in setUserMember");
      // console.log("context.state.user.data.uid: ");
      // console.log(context.state.user.data.uid);
      let url = "api/members/firebase/" + context.state.user.data.uid;
      try {
        let response = await axios.get(url, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
        // console.log("axios.get member from UID response.data: " + JSON.stringify(response.data));
        context.commit("SET_USER_MEMBER", response.data);
      }
      catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
    collection,
    members,
    groups,
    plays,
    record,
  },
});

export default store;