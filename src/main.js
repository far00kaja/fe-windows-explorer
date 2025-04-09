import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index";
import axios from "axios";
axios.defaults.baseURL =
  import.meta.env.VITE_ENDPOINT_URL ?? "http://localhost:3000";
createApp(App).use(router).use(createPinia()).mount("#app");
