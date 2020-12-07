<template>
  <v-app>

    <!-- Top App Bar -->
    <v-app-bar app clipped-left color="primary" dark>
      <!-- Logo/Brand -->
      <div class="d-flex align-center">
        <v-img alt="ScoreBoard Logo" class="shrink mr-2" contain
          :src="'../img/logo/default_2.png'" transition="scale-transition" width="160" />
      </div>
      <v-spacer></v-spacer>
      <!-- Profile picture + dropdown menu -->
      <v-menu v-model="profileDropdown" close-on-click close-on-content-click offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">          
          <v-avatar v-bind="attrs" v-on="on">
            <v-img class="profile-picture-border" src="https://randomuser.me/api/portraits/men/86.jpg"></v-img>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="" class="px-4">
            <v-icon class="pr-3">mdi-cog</v-icon>
            <span class="mx-auto">Settings</span>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="" class="px-4">
            <v-icon class="pr-3">mdi-logout</v-icon>
            <span class="mx-auto">Log Out</span>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Side Navigation Drawer on Large Devices -->
    <v-navigation-drawer app clipped disable-route-watcher v-model="sideDrawer" :width="200" :mini-variant.sync="mini" :permanent="$vuetify.breakpoint.smAndUp">
      
      <!-- Group Selection Dropdown -->
      <v-list-item v-if="!mini" class="group-select-item-height">
        <GroupSelectExpanded :dropBelow="true" :dropAbove="false" />
      </v-list-item>
      <v-list-item v-else class="group-select-padding group-select-item-height">
        <GroupSelectShrunk :dropBelow="true" :dropAbove="false" />
      </v-list-item>
      <v-divider></v-divider>

      <!-- Side Menu Items -->
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-row>
          <v-spacer v-if="!mini"></v-spacer>
          <v-col v-if="!mini" class="text-right">
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col v-else class="text-center">
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content of App -->
    <v-main>
      <v-fade-transition mode="out-in" duration="150">
        <router-view class="full-screen" />
      </v-fade-transition>
      <v-footer color="primary">
        <v-row justify="center"></v-row>
        <v-col cols="12" class="text-center py-0">
          <v-btn icon color="white" exact href="https://github.com/smophat7/score-board-pwa" target="_blank">
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="text-center py-0">
          <p style="color:white" class="my-auto">© 2020 Spencer Moffat</p>
        </v-col>
        <br>
      </v-footer>
    </v-main>

    <!-- Mobile FAB -->
      <!-- <v-fab-transition>
        <v-btn class="d-sm-none fab-mobile" to="/record" color="secondary" fab large dark>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition> -->

    <!-- More menu -->
    <v-bottom-sheet v-model="mobileDrawerBotom" class="d-sm-none">
      <v-sheet class="text-center" height="200px">
        <v-container>
          <GroupSelectExpanded :dropBelow="false" :dropAbove="true" />
        </v-container>
        <div class="py-3">
          More options, pages, and account controls can go here
        </div>
        <v-btn class="mt-6" text color="red" @click="mobileDrawerBotom = !mobileDrawerBotom">
          Close
        </v-btn>
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
import GroupSelectExpanded from "@/components/AppView/GroupSelectExpanded";
import GroupSelectShrunk from "@/components/AppView/GroupSelectShrunk";

export default {
  name: "App",
  components: {
    GroupSelectExpanded,
    GroupSelectShrunk,
  },
  data: () => ({
    profileDropdown: false,
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
        title: 'Collection',
        icon: 'mdi-dice-multiple',
        path: '/shelf'

      },
      {
        title: 'Plays',
        icon: 'mdi-history',
        path: '/history'
      },
    ],
    mini: false,
  })
};
</script>


<style>
/* Globally applied styles */

.profile-picture-border {
  border: solid 1.5px white;
}

.group-select-padding {
  padding: 5px !important;
}

.group-select-item-height {
  height: 58px;
}

.group-coloring {
  color: white;
}

.fab-mobile {
  position: fixed;
  bottom: calc(56px + 12px);
  right: 12px;
}

.full-screen {
  min-height: calc(100vh - 56px);
}

@media (max-width: 600px){
  .margin-bottom-for-fab {
    margin-bottom: 50px;
  }
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