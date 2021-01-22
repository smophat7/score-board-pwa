import Vue from "vue";
import VueRouter from "vue-router";
// import firebase from "firebase";
import store from "@/store/index.js";


Vue.use(VueRouter);

const routes = [
  // { path: '/',
  //   redirect: { name: 'Collection' },
  // },
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
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const hideForAuth = to.matched.some(x => x.meta.hideForAuth);
  const requiresOnboardingComplete = to.matched.some(x => x.meta.requiresOnboardingComplete);

  // Authentication checks
  if (requiresAuth && !store.state.user.loggedIn) {
    next('/login');
  }
  else if (hideForAuth && store.state.user.loggedIn) {
    next('/collection');
  }
  
  // Onboarding-complete check
  if (requiresOnboardingComplete && !store.state.user.member.onboardingComplete) {
    next('/onboarding');
  }
  else {
    next()
  }
});

export default router;
