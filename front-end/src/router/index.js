import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: '/',
    redirect: { name: 'Collection' },
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import("../components/Analytics/Analytics.vue")
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import("../components/Members/Members.vue")
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import("../components/Collection/Collection.vue")
  },
  {
    path: '/plays',
    name: 'Plays',
    component: () => import("../components/Plays/Plays.vue")
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import("../components/Plays/Record/RecordGame.vue")
  }
];

const router = new VueRouter({
  routes,
  // Scrolls to top when you change <router-view>s
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

export default router;
