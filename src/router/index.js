import AboutViewVue from "@/views/AboutView.vue";
import EventDetailsVue from "@/views/event/DetailsItem.vue";
import EventRegisterVue from "@/views/event/RegisterItem.vue";
import EventEditVue from "@/views/event/EditItem.vue";
import EventLayout from "@/views/event/LayoutItem.vue";
import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";
import NProgress from "nprogress";
import EventService from "@/services/EventService";
import GStore from "@/store";
import CreateItemVue from "@/views/event/CreateItem.vue";

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
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: "404Resource",
              params: {
                resource: "event",
              },
            };
          } else {
            return {
              name: "NetworkError",
            };
          }
        });
    },
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
        meta: { requiresAuth: true },
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
    path: "/event/create",
    name: "EventCreate",
    component: CreateItemVue,
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
  scrollBehavior(_, __, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from) => {
  NProgress.start();

  const notAuthorized = true;

  if (to.meta.requiresAuth && notAuthorized) {
    GStore.flashMessage = "Sorry, you are not authorized to view this page.";

    setTimeout(() => {
      GStore.flashMessage = "";
    }, 3000);

    return from.href ? false : { path: "/" };
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
