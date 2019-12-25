import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      guest: true,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/auth/Signup.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/auth/Signin.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import(/* webpackChunkName: "portfolio" */ '../views/Portfolio.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: () => import(/* webpackChunkName: "stocks" */ '../views/Stocks.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import(/* webpackChunkName: "quiz" */ '../views/Quiz.vue'),
    meta: {
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  const hasToken = !!store.state.auth.token;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (hasToken) {
      next();
    } else {
      next({
        name: 'signin',
      });
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (hasToken) {
      next({
        name: 'dashboard',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
