import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "mosha-vue-toastify/dist/style.css";
import vue3lottie from "vue3-lottie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faAt,
  faHandPointRight,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faEnvelope, faCopyright, faAt, faHandPointRight, faPencilAlt);
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vue3lottie);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
