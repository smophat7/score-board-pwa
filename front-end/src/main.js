import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from 'firebase/app';
import 'firebase/auth';

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

// Mock data to fill stuff in for development purposes
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

// Firebase initialization

var firebaseConfig = {
  apiKey: "AIzaSyC-ZIvbUdr1aG-2AKWtvyhLKmxV1-lTeRE",
  authDomain: "scoreboard-51b31.firebaseapp.com",
  projectId: "scoreboard-51b31",
  storageBucket: "scoreboard-51b31.appspot.com",
  messagingSenderId: "900445771506",
  appId: "1:900445771506:web:1ad2bbac1e4fc74b55a26b",
  measurementId: "G-HT2H1WV990"
};
firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  data,
  vuetify,
  render: h => h(App)
}).$mount("#app");
