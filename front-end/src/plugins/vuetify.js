import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3949ab',
        secondary: '#2e7d32',
      }
    }
  },
  // options: {
  //   customProperties: true,
  // },
});