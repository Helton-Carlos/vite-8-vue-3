import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/Dashboard',
    name: 'dashboard',
    component: () => import('../view/Dashboard.vue'),
  },
  {
    path: '/About',
    name: 'about',
    component: () => import('../view/About.vue'),
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
