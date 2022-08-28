import EventService from "@/services/EventService";
import { createStore } from "vuex";

export default createStore({
  state: {
    user: "Uendel Couto",
    events: [],
    event: null,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then((response) => {
          commit("ADD_EVENT", response.data);
          commit("SET_EVENT", response.data);
        })
        .catch((error) => {
          throw error;
        });
    },
    async fetchEvents({ commit }) {
      return EventService.getEvents()
        .then((response) => {
          commit("SET_EVENTS", response.data);
        })
        .catch((error) => {
          throw error;
        });
    },
    async fetchEvent({ commit }, id) {
      const event = this.state.events.find((event) => event.id === id);
      if (event) {
        commit("SET_EVENT", event);
      } else {
        return EventService.getEvent(id)
          .then((response) => {
            commit("SET_EVENT", response.data);
          })
          .catch((error) => {
            throw error;
          });
      }
    },
  },
});
