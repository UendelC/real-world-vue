import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import GStore from "./store";
import "nprogress/nprogress.css";
import store from "./vuex_store";

createApp(App).use(router).use(store).provide("GStore", GStore).mount("#app");
