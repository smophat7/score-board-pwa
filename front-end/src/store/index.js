import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordPlayers: [],
    ifMemberEditComponent: false,
    ifGroupChanged: false,
  },
  getters: {
    recordPlayers: (state) => state.recordPlayers,
    ifMemberEditComponent: (state) => state.ifMemberEditComponent,
    ifGroupChanged: (state) => state.ifGroupChanged,
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
    }
  },
  actions: {},
  modules: {}
});
