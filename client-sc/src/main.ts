import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "mosha-vue-toastify/dist/style.css";
import vue3lottie from "vue3-lottie";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vue3lottie);

app.mount("#app");
