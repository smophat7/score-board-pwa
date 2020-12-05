import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordStep: 1,                    // Which step of the record game wizard the user is in
    recordPlayers: [],                // Players in the game play being recorded
    recordGame: null,                 // Which game is being recorded
    recordGameType: "",               // Which game type is being recorded
    ifMemberEditComponent: false,     // Controls view of MemberDetails.vue
    ifGroupChanged: false,            // Set to true on changes to the members Mongo collection to trigger an API get request
    ifGameEditComponent: false,       // Controls view of GameDetails.vue
    ifCollectionChanged: false,       // Set to true on changes to the members Mongo collection to trigger an API get request
  },
  getters: {
    recordStep: (state) => state.recordStep,
    recordPlayers: (state) => state.recordPlayers,
    recordGame: (state) => state.recordGame,
    recordGameType: (state) => state.recordGameType,
    ifMemberEditComponent: (state) => state.ifMemberEditComponent,
    ifGroupChanged: (state) => state.ifGroupChanged,
    ifGameEditComponent: (state) => state.ifGameEditComponent,
    ifCollectionChanged: (state) => state.ifCollectionChanged,
  },
  mutations: {
    changeRecordStep(state, step) {
      state.recordStep = step;
    },
    updateRecordPlayers(state, members) {
      state.recordPlayers = members;
    },
    updateRecordGame(state, game) {
      state.recordGame = game;
    },
    updateRecordGameType(state, type) {
      state.recordGameType = type;
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
    },
  },
  actions: {},
  modules: {}
});
