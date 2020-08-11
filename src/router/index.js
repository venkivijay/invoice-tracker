import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

import { auth } from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      authOnly: true,
    },
  },
  // {
  //   path: "/invoice/new",
  //   name: "Create Invoice",
  //   component: CreateInvoice,
  //   meta: {
  //     authOnly: true,
  //   },
  // },
  // {
  //   path: "/invoice/:id",
  //   name: "Invoice",
  //   component: Invoice,
  //   meta: {
  //     authOnly: true,
  //   },
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.authOnly) && !auth().currentUser)
    next("/login");
  else if (
    to.matched.some((route) => route.meta.guestOnly) &&
    auth().currentUser
  )
    next("/");
  else next();
});

export default router;
