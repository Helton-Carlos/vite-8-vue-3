import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);
app
  .use(router)
  .use(pinia)
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount("#app");
