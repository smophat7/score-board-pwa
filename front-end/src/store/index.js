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
    async registerNewUser(context, newUserInfo) {
      let newFirebaseUser = {
        email: newUserInfo.email,
        password: newUserInfo.password,
      }
      await context.dispatch('createNewFirebaseUser', newFirebaseUser);

      if (context.state.user.loggedIn) {
        let newMongoMember = {
          firstName: newUserInfo.firstName,
          lastName: newUserInfo.lastName,
          fullName: newUserInfo.firstName + " " + newUserInfo.lastName,
          profilePicture: "default-profile.jpg",        // TODO supply individualized URL or picture data
          firebaseUID: context.state.user.data.uid,
        };
        await context.dispatch("members/add", newMongoMember, {root:true});
        await context.dispatch("setUserMember");
      }
      else {
        console.log("Not logged in, so I didn't try to make a new mongo member or group or anything. I'm assuming registration failed?");
      }
    },
    async completeOnboarding(context) {
      let url = "/api/members/onboardingStatus/" + context.state.user.member._id;
      try {
        let response = await axios.put(url, { onboardingComplete: true }, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
        context.commit("SET_USER_MEMBER", response.data);
      }
      catch (error) {
        console.log(error);
      }
    },
    async createNewFirebaseUser(context, newUser) {
      let email = newUser.email;
      let password = newUser.password;
      try {
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
    setLoggedIn(context, ifLoggedIn) {
      context.commit("SET_LOGGED_IN", ifLoggedIn);
    },
    setIdToken(context, idToken) {
      context.commit("SET_USER_IDTOKEN", idToken);
    },
    async setUserMember(context) {
      let url = "api/members/firebase/" + context.state.user.data.uid;
      try {
        let response = await axios.get(url, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
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