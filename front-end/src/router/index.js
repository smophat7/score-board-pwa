import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

import firebase from 'firebase/app';
import 'firebase/auth';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import("../components/AppView/LandingPage/LandingPage.vue"),
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("../components/UserAuthentication/Registration/Register.vue"),
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import("../components/UserAuthentication/Registration/Onboarding.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../components/UserAuthentication/Login.vue"),
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: '/joinGroup',
    name: 'JoinGroupWithJoinCode',
    component: () => import("../components/GroupManagement/JoinGroup.vue"),
    meta: {
      requiresAuth: true,
      requiresOnboardingComplete: true,
    },
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import("../components/Analytics/Analytics.vue"),
    meta: {
      requiresAuth: true,
      requiresOnboardingComplete: true,
    },
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import("../components/Members/Members.vue"),
    meta: {
      requiresAuth: true,
      requiresOnboardingComplete: true,
    },
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import("../components/Collection/Collection.vue"),
    meta: {
      requiresAuth: true,
      requiresOnboardingComplete: true,
    },
  },
  {
    path: '/plays',
    name: 'Plays',
    component: () => import("../components/Plays/Plays.vue"),
    meta: {
      requiresAuth: true,
      requiresOnboardingComplete: true,
    },
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import("../components/Plays/Record/RecordGame.vue"),
    meta: {
      requiresAuth: true,
      requiresOnboardingComplete: true,
    },
  },
];

const router = new VueRouter({
  routes,
  // Scrolls to top when you change <router-view>s
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

// Navigation guards that check for authentication/onboarding meta properties in routes
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const hideForAuth = to.matched.some(x => x.meta.hideForAuth);
  const requiresOnboardingComplete = to.matched.some(x => x.meta.requiresOnboardingComplete);

  // If the user refreshes the page and we lose some state, this if clause will catch that and do some of the stuff normally 
  // done in firebase.js, only if the desired page requiresAuth or requiresOnboardingComplete. A bit of code duplication, but
  // these things only get called if there is a manual page refresh to set the state correctly for everything else to use.
  // This is the only reason that this whole router.beforeEach() thing needs to be async.
  if ((requiresAuth || requiresOnboardingComplete) && (store.state.user == null || store.state.user.member == null)) {
    let user = firebase.auth().currentUser;
    await store.dispatch("setUserData", user);
    if (user) {
      try {
        let idToken = await user.getIdToken(/* forceRefresh */ true)
        await store.dispatch("setIdToken", idToken);
        await store.dispatch("setUserMember");
        await store.dispatch("groups/fetch");
        await store.dispatch("groups/setCurrentGroup", store.state.groups.groups[0]);
        await store.dispatch("collection/fetch");
        await store.dispatch("members/fetch");
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  // Authentication checks
  if (requiresAuth && !store.state.user.loggedIn) {
    next('/login');
  }
  else if (hideForAuth && store.state.user.loggedIn) {
    next('/collection');
  }
  
  // Onboarding-complete check
  if (requiresOnboardingComplete) {
    if (store.state.user.loggedIn) {
      if (!store.state.user.member.onboardingComplete) {
        next('/onboarding');
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  }

  // Default is just to continue
  else {
    next();
  }
});

export default router;
