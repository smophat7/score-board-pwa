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
      // console.log("just made a new Firebase user in registerNewUser");

      if (context.state.user.loggedIn) {
        // console.log("about to create new Mongo Member");
        let newMongoMember = {
          firstName: newUserInfo.firstName,
          lastName: newUserInfo.lastName,
          profilePicture: "default-profile.jpg",        // EDIT to supply individualized URL or picture data
          firebaseUID: context.state.user.data.uid, 
        };
        await context.dispatch("members/add", newMongoMember, {root:true});
        // console.log("about to setUserMember from registration thing");
        await context.dispatch("setUserMember");
  
        // console.log("about to create NewGroup");
        let newGroup = {
          name: newUserInfo.firstName + "'s Group",
          members: [context.state.user.member.id],
          joinCode: Math.random().toString(36).substr(2, 8).toUpperCase(),          // Randomly generated all-caps alphanumeric string, 8-chars
        };
        await context.dispatch("groups/add", newGroup, {root:true});
        // console.log("about to fetch all the groups this member belongs to");
        await context.dispatch("groups/fetch", {root:true});
        // console.log("about to set the current group");
        await context.dispatch("groups/setCurrentGroup", context.rootState.groups.groups[0], {root:true});
      }
      // else {
      //   console.log("Not logged in, so I didn't try to make a new mongo member or group or anything. I'm assuming registration failed?");
      // }
    },
    async createNewFirebaseUser(context, newUser) {
      let email = newUser.email;
      let password = newUser.password;
      try {
        // console.log("About to create new user with email and password");
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
      // console.log("in setUserMember");
      // console.log("context.state.user.data.uid: ");
      // console.log(context.state.user.data.uid);
      let url = "api/members/firebase/" + context.state.user.data.uid;
      try {
        let response = await axios.get(url, { headers: { authorization: `Bearer ${context.rootState.user.idToken}` }});
        // console.log("axios.get member from UID response.data: " + JSON.stringify(response.data));
        // console.log("set_user_member response.data: " + response.data);
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