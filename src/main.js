import { createApp } from "vue";
import App from "./App.vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import router from "./router/router.js";
import store from "./store/store.js";


const app = createApp(App);
app.use(createVuestic());
app.use(store);
app.use(router);
app.mount("#app");
