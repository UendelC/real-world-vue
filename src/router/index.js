import AboutViewVue from "@/views/AboutView.vue";
import EventDetailsVue from "@/views/event/DetailsItem.vue";
import EventRegisterVue from "@/views/event/RegisterItem.vue";
import EventEditVue from "@/views/event/EditItem.vue";
import EventLayout from "@/views/event/LayoutItem.vue";
import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/about",
    name: "About",
    component: AboutViewVue,
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetailsVue,
      },
      {
        path: "register",
        name: "EventRegister",
        props: true,
        component: EventRegisterVue,
      },
      {
        path: "edit",
        name: "EventEdit",
        props: true,
        component: EventEditVue,
      },
    ],
  },
  {
    path: "/event/:id",
    redirect: () => {
      return { name: "EventLayout" };
    },
    children: [
      { path: "", redirect: () => ({ name: "EventDetails" }) },
      { path: "register", redirect: () => ({ name: "EventRegister" }) },
      { path: "edit", redirect: () => ({ name: "EventEdit" }) },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
