import { createMemoryHistory, createRouter } from 'vue-router';

import Dashboard from '../view/Dashboard.vue';
import About from '../view/About.vue';

const routes = [
  { path: '/Dashboard', name: 'dashboard', component: Dashboard },
  { path: '/About', name: 'about', component: About },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
