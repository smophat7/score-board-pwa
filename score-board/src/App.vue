<template>
  <v-app>

    <v-app-bar app clipped-left color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />
        ScoreBoard
      </div>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Side Navigation Drawer on Large Devices -->
    <v-navigation-drawer app clipped v-model="sideDrawer" :width="200" :mini-variant.sync="mini" :permanent="$vuetify.breakpoint.smAndUp">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/86.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>John Leider</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item class="d-flex-wrap justify-center">
          <!-- <v-fab-transition> -->
            <v-btn v-show="mini" color="secondary" dark small fab>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          <!-- </v-fab-transition> -->
          <v-scroll-x-transition>
            <v-btn v-show="!mini" color="secondary" dark small>
              <v-icon>mdi-plus</v-icon>
              <span>Record Game</span>
            </v-btn>
          </v-scroll-x-transition>
        </v-list-item>

        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-fade-transition mode="out-in">
      <router-view/>
      </v-fade-transition>
    </v-main>

    <!-- Mobile FAB -->
      <v-fab-transition>
        <v-btn class="d-sm-none fab-mobile" color="secondary" fab large dark>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>

    <!-- More menu -->
    <v-bottom-sheet v-model="mobileDrawerBotom" class="d-sm-none">
      <v-sheet class="text-center" height="150px">
        <v-btn class="mt-6" text color="red" @click="mobileDrawerBotom = !mobileDrawerBotom">
          Close
        </v-btn>
        <div class="py-3">
          More options, pages, and account controls can go here
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <!-- Mobile Navigation and Bottom Drawer-->
    <v-bottom-navigation app class="d-sm-none" color="primary" grow>
      <v-btn v-for="item in items" :key="item.title" link :to="item.path">
        <span>{{item.title}}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
      <v-btn @click="mobileDrawerBotom = !mobileDrawerBotom, notDisabled = false" active-class="no-active" :class="{ 'v-btn--active': notDisabled }">
        <span>More</span>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  },

  data: () => ({
    mobileDrawerBotom: false,
    notDisabled: false,
    sideDrawer: null,
    items: [{
        title: 'Analytics',
        icon: 'mdi-chart-areaspline',
        path: '/analytics'
      },
      {
        title: 'Group',
        icon: 'mdi-account-group',
        path: '/group'

      },
      {
        title: 'Shelf',
        icon: 'mdi-dice-multiple',
        path: '/shelf'

      },
      {
        title: 'History',
        icon: 'mdi-history',
        path: '/history'
      },
    ],
    mini: false,
  })
};
</script>

<style scoped>
.fab-mobile {
  position: fixed;
  bottom: calc(56px + 20px);
  left: 20px;
}

/* CSS fix from https://github.com/vuetifyjs/vuetify/issues/8067 */
/* v-bottom-navigation buttons had space beneath them in production build only */
/* (I think CSS is processed in a different order) */
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}

/* Overrides the active class (v-btn--active) for the "more" button in v-bottom-navigation*/
.no-active {
  color:rgba(0, 0, 0, 0.6) !important;
}
</style>