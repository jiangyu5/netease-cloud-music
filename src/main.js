import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router/index.js";
import { createPinia } from "pinia";

import "./scss/bootstrap.scss";
import { Offcanvas } from "bootstrap";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount("#app");
