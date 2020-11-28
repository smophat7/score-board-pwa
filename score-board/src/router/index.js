import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import("../views/Analytics/Analytics.vue")
  },
  {
    path: '/group',
    name: 'Group',
    component: () => import("../views/Group/Group.vue")
  },
  {
    path: '/shelf',
    name: 'Shelf',
    component: () => import("../views/Shelf/Shelf.vue")
  },
  {
    path: '/history',
    name: 'History',
    component: () => import("../views/History/History.vue")
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import("../views/Record/RecordGame.vue")
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
