import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../view/Dashboard.vue"),
    meta: { requiresAuth: true, title: "Bem-vindo(a)" },
  },
  {
    path: "/listagem",
    name: "listagem",
    component: () => import("../view/Listagem.vue"),
    meta: { requiresAuth: true, title: "Listagem" },
  },
  {
    path: "/graficos",
    name: "graficos",
    component: () => import("../view/Graficos.vue"),
    meta: { requiresAuth: true, title: "Gráficos" },
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

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = localStorage.getItem("user");

  if (requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});
