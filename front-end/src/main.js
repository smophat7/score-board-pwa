import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import enumGameType from './assets/enumGameType.js';

// Mock data to fill stuff in
import mockShelf from "./mockData/mockShelf.js";
import mockMembers from "./mockData/mockMembers.js";
import mockHistory from "./mockData/mockHistory.js";

let data = {
  // Mock shelf data
  shelf: mockShelf,
  members: mockMembers,
  history: mockHistory,
  enumGameType,
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data,
  vuetify,
  render: h => h(App)
}).$mount("#app");
