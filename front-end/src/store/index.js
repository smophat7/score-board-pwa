import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordPlayers: [],                // Players in the game play being recorded
    ifMemberEditComponent: false,     // Controls view of MemberDetails.vue
    ifGroupChanged: false,            // Set to true on changes to the members Mongo collection to trigger an API get request
    ifGameEditComponent: false,       // Controls view of GameDetails.vue
    ifCollectionChanged: false,       // Set to true on changes to the members Mongo collection to trigger an API get request
  },
  getters: {
    recordPlayers: (state) => state.recordPlayers,
    ifMemberEditComponent: (state) => state.ifMemberEditComponent,
    ifGroupChanged: (state) => state.ifGroupChanged,
    ifGameEditComponent: (state) => state.ifGameEditComponent,
    ifCollectionChanged: (state) => state.ifCollectionChanged,
  },
  mutations: {
    updateRecordPlayers(state, members) {
      state.recordPlayers = members;
    },
    clearRecordValues(state) {
      state.recordPlayers = [];
    },
    setIfMemberEditComponent(state, isEditing) {
      state.ifMemberEditComponent = isEditing;
    },
    setIfGroupChanged(state, ifChanged) {
      state.ifGroupChanged = ifChanged;
    },
    setIfGameEditComponent(state, isEditing) {
      state.ifGameEditComponent = isEditing;
    },
    setIfCollectionChanged(state, ifChanged) {
      state.ifCollectionChanged = ifChanged;
    }
  },
  actions: {},
  modules: {}
});
