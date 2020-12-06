import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordStep: 1,                    // Which step of the record game wizard the user is in
    
    recordPlayers: [],                // Players in the game play being recorded
    recordGame: null,                 // Which game is being recorded
    recordGameType: "",               // Which game type is being recorded
    recordPoints: null,               // In points game, an object with keys (member id) to value (points)
    recordRank: null,                 // In ranked game, something??? idk how this one will work yet
    recordCoopWin: false,             // In co-op, true if the players won
    recordDescription: "",            // What written description is to be recorded
    recordDate: new Date(),                 // Date the game was played

    ifMemberEditComponent: false,     // Controls what to view within MemberDetails.vue
    ifGroupChanged: false,            // Set to true on changes to the members Mongo collection to trigger an API get request
    ifGameEditComponent: false,       // Controls what to view within GameDetails.vue
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
    recordPoints: (state) => state.recordPoints,
    recordRank: (state) => state.recordRank,
    recordCoopWin: (state) => state.racordCoopWin,
    recordDescription: (state) => state.recordDescription,
    recordDate: (state) => state.recordDate,
  },
  mutations: {
    changeRecordStep(state, step) {
      state.recordStep = step;
    },
    updateRecordPlayers(state, members) {
      state.recordPlayers = members;
    },
    clearRecordValues(state) {
      state.recordPlayers = [];
    },
    updateRecordGame(state, game) {
      state.recordGame = game;
    },
    updateRecordGameType(state, type) {
      state.recordGameType = type;
    },
    updateRecordPoints(state, pointAssignment) {
      state.recordPoints = pointAssignment;
    },
    updateRecordRank(state, ranking) {
      state.recordRank = ranking;
    },
    updateRecordCoopWin(state, ifGroupWin) {
      state.recordCoopWin = ifGroupWin;
    },
    updateRecordDescription(state, text) {
      state.recordDescription = text;
    },
    updateRecordDate(state, date) {
      state.recordDate = date;
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
