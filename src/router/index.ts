import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../view/Dashboard.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../view/Login.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
