import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Font-Awesome - only the icons I need instead of them all
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus);
library.add(faChessRook);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);


// Custom enum for game types
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
