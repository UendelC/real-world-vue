import AboutViewVue from "@/views/AboutView.vue";
import EventDetailsVue from "@/views/EventDetails.vue";
import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
  },
  {
    path: "/about",
    name: "About",
    component: AboutViewVue,
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    props: true,
    component: EventDetailsVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
