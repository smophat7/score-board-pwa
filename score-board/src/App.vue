<template>
  <v-app>

    <!-- Top App Bar -->
    <v-app-bar app clipped-left color="primary" dark>
      <!-- Logo/Brand -->
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />
        ScoreBoard
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
    <!-- Account Selection -->
    <v-navigation-drawer app clipped v-model="sideDrawer" :width="200" :mini-variant.sync="mini" :permanent="$vuetify.breakpoint.smAndUp">
      <!-- Group Selection Dropdown -->
      <v-list-item v-if="!mini" class="group-select-item-height">
        <v-menu v-model="groupSelectDropdown"
          close-on-click close-on-content-click
          offset-y class="group-menu-align"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" block color="secondary">
              Group Name
              <v-icon v-if="groupSelectDropdown">mdi-chevron-up</v-icon>
              <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="" class="px-4">
              <span>Other Group Name</span>
            </v-list-item>
            <v-list-item @click="" class="px-4">
              <span>Third Name Here</span>
            </v-list-item>
            <v-list-item @click="" class="px-4">
              <span>Why Not Four?</span>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="" class="px-4">
              <v-icon class="pr-3">mdi-account-arrow-right</v-icon>
              <span class="mx-auto">Join a Group</span>
            </v-list-item>
            <v-list-item @click="" class="px-4">
              <v-icon class="pr-3">mdi-plus</v-icon>
              <span class="mx-auto">Create a Group</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
      <v-list-item v-else class="group-select-padding group-select-item-height">
        <v-menu v-model="groupSelectDropdown"
          close-on-click close-on-content-click
          offset-y class="group-menu-align"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="mx-auto">
              <v-avatar v-bind="attrs" v-on="on" color="secondary">
                <span class="group-coloring">GN</span>
              </v-avatar>
            </v-btn>
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
      </v-list-item>
      <v-divider></v-divider>

      <v-list>
        <!-- Side Menu Items -->
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
      <!-- <v-fade-transition mode="out-in"> -->
        <router-view/>
      <!-- </v-fade-transition> -->
    </v-main>

    <!-- Mobile FAB -->
      <!-- <v-fab-transition>
        <v-btn class="d-sm-none fab-mobile" to="/record" color="secondary" fab large dark>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition> -->

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
    profileDropdown: false,
    groupSelectDropdown: false,
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