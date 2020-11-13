<template>
  <v-app>

    <v-app-bar app clipped-left color="primary" dark dense>
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


        <v-list-item v-for="item in items" :key="item.title" link>
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
      <HelloWorld />
    </v-main>

    <!-- Mobile FAB -->
      <v-fab-transition>
        <v-btn class="d-sm-none fab-mobile" color="secondary" fab large dark>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>


    <!-- Mobile Navigation and Bottom Drawer-->
    <v-bottom-navigation app color="primary" grow class="d-sm-none">
      <v-btn>
        <span>Analytics</span>
        <v-icon>mdi-chart-areaspline</v-icon>
      </v-btn>
      <v-btn>
        <span>Members</span>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
      <v-btn>
        <span>Shelf</span>
        <v-icon>mdi-dice-multiple</v-icon>
      </v-btn>
      <v-btn>
        <span>History</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-btn @click="mobileDrawerBotom = !mobileDrawerBotom">
        <span>More</span>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!-- More menu -->
    <v-bottom-sheet v-model="mobileDrawerBotom" class="d-sm-none">
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="red" @click="mobileDrawerBotom = !mobileDrawerBotom">
          close
        </v-btn>
        <div class="py-3">
          This is a bottom sheet using the controlled by v-model instead of activator
        </div>
      </v-sheet>
    </v-bottom-sheet>

  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    mobileDrawerBotom: false,
    sideDrawer: null,
    items: [{
        title: 'Analytics',
        icon: 'mdi-chart-areaspline'
      },
      {
        title: 'Members',
        icon: 'mdi-account-group'
      },
      {
        title: 'Shelf',
        icon: 'mdi-dice-multiple'
      },
      {
        title: 'History',
        icon: 'mdi-history'
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
</style>