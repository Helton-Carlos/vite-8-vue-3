import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../view/Dashboard.vue'),
    meta: { requiresAuth: true, title: 'Dashboard' },
  },
  {
    path: '/tanques',
    name: 'tanques',
    component: () => import('../view/Tanques.vue'),
    meta: { requiresAuth: true, title: 'Tanques' },
  },
  {
    path: '/especies',
    name: 'especies',
    component: () => import('../view/Especies.vue'),
    meta: { requiresAuth: true, title: 'Espécies' },
  },
  {
    path: '/alimentacao',
    name: 'alimentacao',
    component: () => import('../view/Alimentacao.vue'),
    meta: { requiresAuth: true, title: 'Alimentação' },
  },
  {
    path: '/qualidade-agua',
    name: 'qualidade-agua',
    component: () => import('../view/QualidadeAgua.vue'),
    meta: { requiresAuth: true, title: 'Qualidade da Água' },
  },
  {
    path: '/colheitas',
    name: 'colheitas',
    component: () => import('../view/Colheitas.vue'),
    meta: { requiresAuth: true, title: 'Colheitas' },
  },
  {
    path: '/configuracoes',
    name: 'configuracoes',
    component: () => import('../view/Configuracoes.vue'),
    meta: { requiresAuth: true, title: 'Configurações' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/Login.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = localStorage.getItem('user');

  if (requiresAuth && !user) {
    next('/login');
  } else {
    next();
  }
});
