import { createApp } from "vue";
import App from "./App.vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import router from "./router/router.js";
import axios from "axios";
import { createPinia } from "pinia";

import '@/styles/font.scss'

const app = createApp(App);
app.config.globalProperties.axios = axios;
app.use(createVuestic());
app.use(createPinia())
app.use(router);
app.mount("#app");
